
import { HackdashDispatcher } from "../dispatcher";
import { HackdashConstants } from "../constants";

export default {

  find(query) {
    HackdashDispatcher.dispatch({
      type: HackdashConstants.FIND,
      query
    });
  },

  findOne(domain) {
    HackdashDispatcher.dispatch({
      type: HackdashConstants.FINDONE,
      domain
    });
  },

  receive(dashboards) {
    HackdashDispatcher.dispatch({
      type: HackdashConstants.RECEIVE,
      dashboards
    });
  },

  findProjects(domain) {
    HackdashDispatcher.dispatch({
      type: HackdashConstants.FIND_PROJECTS,
      domain
    });
  },

  receiveProjects(domain, projects) {
    HackdashDispatcher.dispatch({
      type: HackdashConstants.RECEIVE_PROJECTS,
      domain,
      projects
    });
  }

};
