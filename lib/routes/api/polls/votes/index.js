
import {Router} from 'express';
import {find, findOne, sendList, sendOne, vote, unvote, setFingerprint} from './controller';

/**
 * Create and expose router
 */

const app = Router();
export default app;

/**
 * Define routes
 */

app.get('/', setFingerprint, find, sendList);
app.post('/:projectId', setFingerprint, findOne, vote, sendOne);
app.delete('/:projectId', setFingerprint, findOne, unvote, sendOne);
