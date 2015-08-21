
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
      title: 'Hackdash Challenge'
    })
  ]);
