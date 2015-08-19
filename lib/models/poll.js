
/**
 * User Schema
 */

import shortid from 'shortid';
import {Schema} from 'mongoose';
const ObjectId = Schema.ObjectId;

const PollSchema = {
  'dashboard':    { type: String, required: true },
  //'owner':        { type: ObjectId, required: true, ref: 'User' },

  'token':        { type: String, default: () => { return shortid.generate(); } },
  'title':        { type: String },
  'isPublic':     { type: Boolean, default: true },

  'open':         { type: Boolean, default: true },
  'votes':        { type: Number, default: 0 },

  'created_at':   { type: Date, default: Date.now },
  'updated_at':   { type: Date, default: Date.now }
};

export default PollSchema;
