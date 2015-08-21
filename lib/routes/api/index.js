
/*
 * RESTfull API
 */

/**
 * Module dependencies
 */

import {Router} from 'express';
import polls from './polls';

/**
 * Expose app
 */

const app = Router();
export default app;

/**
 * Mount routers
 */

app.use('/polls', polls);
