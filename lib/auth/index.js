
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
  let redirect = req.query.redirect || '';
  redirect = redirect.charAt(0) === '/' ? redirect : `/${redirect}`;
  session.redirectUrl = redirect;
  next();
};

const redirectSubdomain = ({session}, res) => res.redirect(session.redirectUrl || '/');

const setPicture = (user, profile) => {
  if(profile.photos && profile.photos.length && profile.photos[0].value) {
    user.picture = profile.photos[0].value.replace('_normal', '_bigger');
  } else if(profile.provider == 'facebook') {
    user.picture = `//graph.facebook.com/${profile.id}/picture?width=73&height=73`;
  } else {
    user.picture = gravatarUrl(user.email || '', {s: '73'});
  }
  user.picture = user.picture || '/default_avatar.png';
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

      setPicture(user, profile);

      user.name = profile.displayName || '';
      user.username = profile.username || profile.displayName;

      try {
        done(null, await user.save());
      } catch(err) {
        done(err, null);
      }

    } else {
      //Update user picture provider if url changed
      var picBefore = user.picture;
      setPicture(user, profile);

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
