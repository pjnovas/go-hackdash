
import _ from 'lodash';
import shortid from 'shortid';

import {Types} from 'mongoose';
import {Poll} from 'lib/models';
import {notify} from 'lib/server/notifier';

export const find = (req, res, next) => {

  Poll
    .find({ isPublic: true })
    .sort( { "created_at" : -1 } )
    .limit(10)
    .exec((err, polls) => {
      req.polls = polls;
      next();
    });

};

export const findMy = (req, res, next) => {

  Poll
    .find({ owner: req.user._id })
    .sort( { "updated_at" : -1 } )
    .exec( (err, polls) => {
      req.polls = polls;
      next();
    });

};

export const findOne = (req, res, next) => {
  let tknId = req.params.tokenOrId;

  let query = { token: tknId };
  req.byToken = true;
  if (Types.ObjectId.isValid(tknId)){
    query = { _id: tknId };
    req.byToken = false;
  }

  Poll.findOne(query, (err, poll) => {
    if (!poll) return res.status(404).end();

    if (query._id && !poll.isPublic){
      if (!req.user || req.user._id.toString() !== poll.owner.toString()){
        return res.status(404).end();
      }
    }

    req.poll = poll;
    next();
  });

};

export const isOwner = (req, res, next) => {
  if (req.user._id.toString() !== req.poll.owner.toString()){
    return res.status(403).end();
  }

  next();
};

export const genToken = (req, res, next) => {

  req.poll.token = shortid.generate();
  req.poll.updated_at = Date.now();

  req.poll.save((err, poll) => {
    next();
  });

};

export const create = (req, res, next) => {
  let _poll = req.body;

  delete _poll._id;
  delete _poll.token;
  delete _poll.created_at;
  delete _poll.updated_at;

  _poll.owner = req.user._id;

  Poll.create(_poll, (err, poll) => {
    req.poll = poll;
    next();
  });

};

export const update = (req, res, next) => {
  let _poll = req.body;

  delete _poll.__v;
  delete _poll._id;
  delete _poll.token;
  delete _poll.owner;
  delete _poll.dashboard; //cannot change the dashboard
  delete _poll.created_at;

  _poll.updated_at = Date.now();

  _.assign(req.poll, _poll);

  req.poll.save((err, poll) => {
    req.poll = poll;

    notify('/polls', req.poll._id, 'update', {
      id: req.poll._id,
      title: req.poll.title,
      open: req.poll.open
    });

    next();
  });

};

export const remove = (req, res, next) => {

  req.poll.remove( err => {
    res.status(204).send();
  });

};

const pollToJSON = (poll, user, withToken) => {
  let _poll = poll.toJSON();

  delete _poll.__v;
  delete _poll._id;

  if (withToken){
    return _poll;
  }

  if (!user || user._id.toString() !== poll.owner.toString()){
    delete _poll.token;
  }

  return _poll;
};

export const sendList = (req, res) => {
  res.send(_.map(req.polls, poll => pollToJSON(poll, req.user)));
};

export const sendOne = (req, res) => {
  res.send(pollToJSON(req.poll, req.user, req.byToken));
};
