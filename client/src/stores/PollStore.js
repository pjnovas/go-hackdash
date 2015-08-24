
import { PollDispatcher } from "../dispatcher";

import { PollConstants } from "../constants";
import { PollAPI } from "../api";

import Store from "./Store";

class PollStore extends Store {

  constructor(dispatcher) {
    super(dispatcher);
    this.childIdAttr = "projectId";
  }

  __onDispatch(action) {

    switch (action.type) {
      case PollConstants.FIND:
        PollAPI.find();
        break;
      case PollConstants.FINDONE:
        PollAPI.findOne(action.id);
        break;
      case PollConstants.RECEIVE:
        this.__changed = this.addItems(action.polls);
        break;
      case PollConstants.RECEIVE_VOTES:
        this.mergeChild(action.id, action.votes, "votes");
        break;
      case PollConstants.CREATE:
        PollAPI.create(action.poll);
        break;
      case PollConstants.UPDATE:
        PollAPI.update(action.id, action.poll);
        break;
      case PollConstants.GENERATE_TOKEN:
        PollAPI.generateToken(action.id);
        break;
      case PollConstants.VOTE:
        PollAPI.vote(action.id, action.projectId);
        break;
      case PollConstants.UNVOTE:
        PollAPI.unvote(action.id, action.projectId);
        break;
    }
  }

};

const instance = new PollStore(PollDispatcher);
export default instance;
