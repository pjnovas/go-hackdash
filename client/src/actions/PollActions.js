
import { PollDispatcher } from "../dispatcher";
import { PollConstants } from "../constants";

export default {

  find() {
    PollDispatcher.dispatch({
      type: PollConstants.FIND
    });
  },

  findOne(id) {
    PollDispatcher.dispatch({
      type: PollConstants.FINDONE,
      id
    });
  },

  receive(polls) {
    PollDispatcher.dispatch({
      type: PollConstants.RECEIVE,
      polls
    });
  },

  create(poll) {
    PollDispatcher.dispatch({
      type: PollConstants.CREATE,
      poll
    });
  },

  update(id, poll) {
    PollDispatcher.dispatch({
      type: PollConstants.UPDATE,
      id,
      poll
    });
  },

  generateToken(id) {
    PollDispatcher.dispatch({
      type: PollConstants.GENERATE_TOKEN,
      id
    });
  },

  vote(id, projectId) {
    PollDispatcher.dispatch({
      type: PollConstants.VOTE,
      id,
      projectId
    });
  },

  unvote(id, projectId) {
    PollDispatcher.dispatch({
      type: PollConstants.UNVOTE,
      id,
      projectId
    });
  },

  receiveVotes(id, votes) {
    PollDispatcher.dispatch({
      type: PollConstants.RECEIVE_VOTES,
      id,
      votes
    });
  },

  latest() {
    PollDispatcher.dispatch({
      type: PollConstants.LATEST
    });
  },

  error(data){
    PollDispatcher.dispatch({
      type: PollConstants.ERROR,
      data
    });
  },

  joinRoom(id) {
    PollDispatcher.dispatch({
      type: PollConstants.JOIN_ROOM,
      id
    });
  },

  leaveRoom(id) {
    PollDispatcher.dispatch({
      type: PollConstants.LEAVE_ROOM,
      id
    });
  }

};
