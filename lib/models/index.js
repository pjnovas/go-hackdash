/**
 * Database connection and models definition. It takes care of the app data
 */

/**
 * Module dependencies
 */

import mongoose from 'mongoose';
import {db} from 'config';

import UserSchema from './user';
import PollSchema from './poll';
import VoteSchema from './vote';

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

export const User =  mongoose.model('User', new Schema(UserSchema));
export const Poll =  mongoose.model('Poll', new Schema(PollSchema));
export const Vote =  mongoose.model('Vote', new Schema(VoteSchema));
