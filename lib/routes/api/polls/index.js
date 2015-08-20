
import {Router} from 'express';
import {find, findOne, sendList, sendOne, genToken, create, update} from './controller';
import votes from './votes';

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

app.post('/:tokenOrId/token', findOne, genToken, sendOne);

app.use('/:tokenOrId/votes', findOne, votes);
