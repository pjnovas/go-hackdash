
/**
 * This module is in charge of the authentication/authorization routes
 * We are using PassportJS for a really easy way to add custom authentication
 * services.
 *
 * The plan is to add username/password login in the future (or email-only)
 */

/*
 * Module dependencies
 */

import {Router} from 'express';
import passport from 'passport';
import {keys} from 'config';
import {User} from 'lib/models';
import {url as gravatarUrl} from 'gravatar';

/**
 * Expose auth related router
 */

const app = Router();
export default app;

/**
 * Helpers for database user (de)serialization
 */

passport.serializeUser(({_id}, done) => done(null, _id));
passport.deserializeUser((_id, done) => User.findById(_id, done));

/**
 * Helper for saving user url intent so we redirect to that resource
 * on successful login
 */

const saveRedirect = ({session={}, query}, res, next) => {
  let redirect = query.redirect || '';
  redirect = redirect.charAt(0) === '/' ? redirect : `/${redirect}`;
  session.redirectUrl = redirect;
  next();
};

const redirectSubdomain = ({session}, res) => res.redirect(session.redirectUrl || '/');

const setProviderData = (user, profile) => {

  user.username = profile.username;
  user.name = profile.displayName;

  switch(user.provider){
    case "twitter":
      user.picture =
        profile.photos &&
        profile.photos.length &&
        profile.photos[0].value.replace('_normal', '_bigger') || '';
      break;
    case "facebook":
      user.username = profile.username || profile.displayName.replace(' ', '-');
      user.picture = `//graph.facebook.com/${profile.id}/picture?width=73&height=73`;
      break;
    case "github":
      user.picture = profile._json.avatar_url;
      break;
    case "meetup":
      user.username = user.username || profile._json.id;
      user.name = user.name || profile._json.name;
      user.picture = profile.photo_url;
      break;
    case 'google':
      user.picture =
        profile.photos &&
        profile.photos.length &&
        profile.photos[0].value || '';
      break;
  }

  if (!user.picture){
    let email = profile.emails && profile.emails.length && profile.emails[0].value;
    user.picture = email ? gravatarUrl(email, {s: '73'}) : '';
  }

  return user;

};

/**
 * Generate strategies for each provider
 */

const generateStrategy = provider => {

  // Geneate routes
  app.get(`/auth/${provider}`, saveRedirect, passport.authenticate(provider));
  app.get(`/auth/${provider}/callback`, passport.authenticate(provider, { failureRedirect: '/' }), redirectSubdomain);

  // Require provider own module
  // TODO: Figure out how to use ES2015 syntax instead of requires
  const Strategy = require(`passport-${provider}`).Strategy;

  passport.use(new Strategy(keys[provider], async (token, tokenSecret, profile, done) => {

    let user = await User.findOne({provider_id: profile.id, provider: provider}).exec();

    if(!user) {
      user = new User();
      user.provider = provider;
      user.provider_id = profile.id;
      user = setProviderData(user, profile);

      try {
        done(null, await user.save());
      } catch(err) {
        done(err, null);
      }

    } else {
      //Update user picture provider if url changed
      var picBefore = user.picture;
      user = setProviderData(user, profile);

      if (user.picture !== picBefore){
        try {
          done(null, await user.save());
        } catch(err) {
          done(err, null);
        }
      } else {
        done(null, user);
      }
    }
  }));
}

Object.keys(keys).forEach(generateStrategy);
