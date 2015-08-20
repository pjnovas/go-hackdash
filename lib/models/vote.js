
/**
 * User Schema
 */

import shortid from 'shortid';
import {Schema} from 'mongoose';
const ObjectId = Schema.ObjectId;

const VoteSchema = {
  'projectId':    { type: String, required: true },
  'poll':         { type: ObjectId, required: true, ref: 'Poll' },
  'fingerprints': [{ type: String }],
};

export default VoteSchema;
