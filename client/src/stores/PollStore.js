
import { PollDispatcher } from "../dispatcher";

import { PollConstants } from "../constants";
import { PollAPI } from "../api";
import { PollNotifier } from "../api";

import Store from "./Store";

class PollStore extends Store {

  constructor(dispatcher) {
    super(dispatcher);
    this.childIdAttr = "projectId";
  }

  findId(id){
    let poll = this.getStateById(id);

    if (!poll){ // try to find by Token
      let polls = this.getState();
      poll = _.findWhere(polls, { token: id });
    }

    return poll.id;
  }

  __onDispatch(action) {

    switch (action.type) {
      case PollConstants.LATEST:
        PollAPI.latest();
        break;
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
        this.mergeChild(this.findId(action.id), action.votes, "votes");
        break;
      case PollConstants.CREATE:
        PollAPI.create(action.poll);
        break;
      case PollConstants.UPDATE:
        PollAPI.update(action.id, action.poll);
        break;
      case PollConstants.REMOVE:
        PollAPI.remove(action.id);
        this.__changed = this.removeItem(action.id);
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
      case PollConstants.ERROR:
        this.throwError(action.data);
        break;
      case PollConstants.JOIN_ROOM:
        PollNotifier.join(this.findId(action.id));
        break;
      case PollConstants.LEAVE_ROOM:
        PollNotifier.leave(this.findId(action.id));
        break;
    }
  }

};

const instance = new PollStore(PollDispatcher);
export default instance;
