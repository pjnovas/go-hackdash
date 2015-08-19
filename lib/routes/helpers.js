
/**
 * Router helpers are functions (in general middlewares) common to many routes
 */

/**
 * Module dependencies
 */

import {keys as providers} from 'config';

/*
 * Render templates
 */

export const render = path => (req, res) => res.render(path);

/*
 * Redirect
 */

export const redirect = route => (req, res) => res.redirect(route);

/*
 * Check if current user is authenticated
 */

export const isAuth = (req, res, next) => req.isAuthenticated() ? next() : res.send(403);

/*
 * Add current user template variable
 */

export const loadUser = (req, res, next) => {
  res.locals.user = req.user;
  next();
};

/*
 * Makes vars available to views
 */

export const setViewVar = (key, value) => ((req, res, next) => {
  res.locals[key] = value;
  next();
});

/*
 * Load app providers
 */

export const loadProviders = (req, res, next) => {
  res.locals.providers = Object.keys(providers);
  next();
};
