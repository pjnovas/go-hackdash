
import {Types} from 'mongoose';
import {Vote} from 'lib/models';

export const setFingerprint = (req, res, next) => {
  req.fingerprint = req.header('fingerprint');

  if (!req.fingerprint){
    res.status(400).send({ error: "cannot identify voter" });
  }

  next();
};

export const find = (req, res, next) => {

  Vote.find({ poll: req.poll._id }, (err, votes) => {
    req.votes = votes;
    next();
  });
};

export const findOne = (req, res, next) => {

  Vote.findOne({ projectId: req.params.projectId }, (err, vote) => {
    req.vote = vote;
    next();
  });
};

export const vote = (req, res, next) => {
  const fp = req.fingerprint;

  if (!req.vote){

    if (!Types.ObjectId.isValid(req.params.projectId)){
      return res.status(400).send({ error: "invalid project id" });
    }

    req.vote = new Vote({
      projectId: req.params.projectId,
      poll: req.poll._id,
      votes: []
    });
  }

  if (req.vote.fingerprints.indexOf(fp) > -1){
    res.status(409).send({ error: "already voted this project" });
  }

  req.vote.fingerprints.push(fp);

  req.vote.save((err, vote) => {
    req.vote = vote;
    next();
  });

};

export const unvote = (req, res, next) => {
  const fp = req.fingerprint;

  let idx = req.vote.fingerprints.indexOf(fp);
  if (idx === -1){
    res.status(409).send({ error: "project is not voted" });
  }

  req.vote.fingerprints.splice(idx, 1);

  req.vote.save((err, vote) => {
    req.vote = vote;
    next();
  });
};

const voteToJSON = (vote, fingerprint) => {
  let fps = vote.fingerprints || [];

  return {
    projectId: vote.projectId,
    votes: fps.length,
    voted: fps.indexOf(fingerprint) > -1 ? true : false
  };
};

export const sendList = (req, res) => {

  let votes = req.votes.map( vote => {
    return voteToJSON(vote, req.fingerprint);
  });

  res.send(votes);
};

export const sendOne = (req, res) => {
  res.send(voteToJSON(req.vote, req.fingerprint));
};
