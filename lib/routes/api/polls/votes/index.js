
import {Router} from 'express';
import {find, findOne, sendList, sendOne, vote, unvote, setFingerprint, isOpen} from './controller';

/**
 * Create and expose router
 */

const app = Router();
export default app;

/**
 * Define routes
 */

app.get('/', setFingerprint, find, sendList);
app.post('/:projectId', setFingerprint, isOpen, findOne, vote, sendOne);
app.delete('/:projectId', setFingerprint, isOpen, findOne, unvote, sendOne);
