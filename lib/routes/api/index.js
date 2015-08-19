
/*
 * RESTfull API
 */

/**
 * Module dependencies
 */

import {Router} from 'express';
//import users from './users';
import polls from './polls';

/**
 * Expose app
 */

const app = Router();
export default app;

/**
 * Mount routers
 */

//app.use('/', users);
app.use('/polls', polls);
