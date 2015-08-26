
/**
 * Site router controllers
 */

/**
 * Module dependencies
 */

import {render, redirect, loadUser} from 'lib/routes/helpers';

/*
 * Log out current user
 */

export const logout = (req, res, next) => {
  req.logout();
  next();
};

export const appStack = []
  .concat(loadUser)
  .concat([
    render('index', {
      title: 'Go Hackdash',
      description: 'A Challenge platform for hackathons',
      image: 'http://gohackdash.org/images/logohack.png',
      url: 'http://gohackdash.org'
    })
  ]);
