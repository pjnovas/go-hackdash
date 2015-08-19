
/**
 * Site router controllers
 */

/**
 * Module dependencies
 */

import {version as clientVersion} from '../../../package.json';
import {setViewVar, loadProviders, loadUser, render, redirect} from '../../routes/helpers';
import {googleAnalytics} from '../../../config';

/*
 * Log out current user
 */

export const logout = (req, res, next) => {
  req.logout();
  next();
};

export const userStack = [loadUser, loadProviders];
export const viewsStack = [
  setViewVar('version', clientVersion),
  setViewVar('googleAnalytics', googleAnalytics || "")
];

export const appStack = []
  .concat(userStack)
  .concat(viewsStack)
  .concat([render('index')]);
