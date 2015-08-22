
/**
 * Non-api related routes
 */

import {Router} from 'express';
import {appStack, logout} from './controllers';
import {redirect} from '../helpers';

/**
 * Create and expose router
 */

 const app = Router();
 export default app;

/**
 * Define routes
 */

// Home ----------------------------
app.get('/', appStack);

// Auth  ------------------------------
app.get('/login', appStack);
app.get('/logout', logout, redirect('/'));

// Polls ------------------------------
app.get('/polls', appStack);
app.get('/polls/:idOrToken', appStack);
