
import {Router} from 'express';
import {find, findMy, findOne, sendList, sendOne, genToken, create, update, isOwner, remove} from './controller';
import {isAuth} from '../helpers';
import votes from './votes';

/**
 * Create and expose router
 */

const app = Router();
export default app;

/**
 * Define routes
 */

app.get('/', isAuth, findMy, sendList);
app.get('/latest', find, sendList);

app.get('/:tokenOrId', findOne, sendOne);

app.post('/', isAuth, create, sendOne);
app.put('/:tokenOrId', isAuth, findOne, isOwner, update, sendOne);
app.delete('/:tokenOrId', isAuth, findOne, isOwner, remove);

app.post('/:tokenOrId/token', isAuth, findOne, isOwner, genToken, sendOne);

app.use('/:tokenOrId/votes', findOne, votes);
