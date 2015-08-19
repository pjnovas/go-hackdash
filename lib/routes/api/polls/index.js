
import {Router} from 'express';
import {find, findOne, sendList, sendOne, genToken, create, update} from './controller';
import {redirect} from '../helpers';

/**
 * Create and expose router
 */

const app = Router();
export default app;

/**
 * Define routes
 */

app.get('/', find, sendList);
app.get('/:tokenOrId', findOne, sendOne);

app.post('/', create, sendOne);
app.put('/:tokenOrId', findOne, update, sendOne);

app.post('/:token/token', findOne, genToken, sendOne);
