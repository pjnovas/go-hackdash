/**
 * Database connection and models definition. It takes care of the app data
 */

/**
 * Module dependencies
 */

import mongoose from 'mongoose';
import {db} from 'config';

import userSchema from './user';
import pollSchema from './poll';
import voteSchema from './vote';

/**
 * Module scope constants
 */

const {Schema} = mongoose;

/*
 * DB Connection
 */

mongoose.connect(db.url || (`mongodb://${db.host}/${db.name}`));

/*
 * Models declaration
 */

const UserSchema = new Schema(userSchema);
const PollSchema = new Schema(pollSchema);
const VoteSchema = new Schema(voteSchema);

PollSchema.set('toJSON', {
  virtuals: true
});

export const User =  mongoose.model('User', UserSchema);
export const Poll =  mongoose.model('Poll', PollSchema);
export const Vote =  mongoose.model('Vote', VoteSchema);
