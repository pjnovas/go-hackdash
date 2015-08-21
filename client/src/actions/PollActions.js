
import { AppDispatcher } from "../dispatcher";
import { PollConstants } from "../constants";

export default {

  find() {
    AppDispatcher.dispatch({
      type: PollConstants.FIND
    });
  },

  findOne(id) {
    AppDispatcher.dispatch({
      type: PollConstants.FINDONE,
      id
    });
  },

  receive(polls) {
    AppDispatcher.dispatch({
      type: PollConstants.RECEIVE,
      polls
    });
  },

  create(poll) {
    AppDispatcher.dispatch({
      type: PollConstants.CREATE,
      poll
    });
  },

  update(id, poll) {
    AppDispatcher.dispatch({
      type: PollConstants.UPDATE,
      id,
      poll
    });
  },

  generateToken(id) {
    AppDispatcher.dispatch({
      type: PollConstants.GENERATE_TOKEN,
      id
    });
  },

  vote(id, projectId) {
    AppDispatcher.dispatch({
      type: PollConstants.VOTE,
      id,
      projectId
    });
  },

  unvote(id, projectId) {
    AppDispatcher.dispatch({
      type: PollConstants.UNVOTE,
      id,
      projectId
    });
  },

  receiveVotes(id, votes) {
    AppDispatcher.dispatch({
      type: PollConstants.RECEIVE_VOTES,
      id,
      votes
    });
  }

};
