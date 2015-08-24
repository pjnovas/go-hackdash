
import { HackdashDispatcher } from "../dispatcher";

import { HackdashConstants } from "../constants";
import { HackdashAPI } from "../api";

import Store from "./Store";

class HackdashStore extends Store {

  constructor(dispatcher) {
    super(dispatcher);

    this.idAttr = "domain";
    this.childIdAttr = "_id";
  }

  __onDispatch(action) {

    switch (action.type) {
      case HackdashConstants.FIND:
        HackdashAPI.find(action.query);
        break;
      case HackdashConstants.FINDONE:
        HackdashAPI.findOne(action.domain);
        break;
      case HackdashConstants.RECEIVE:
        this.__changed = this.addItems(action.dashboards);
        break;
      case HackdashConstants.RECEIVE_PROJECTS:
        this.mergeChild(action.domain, action.projects, "projects");
        break;
    }
  }

};

const instance = new HackdashStore(HackdashDispatcher);
export default instance;
