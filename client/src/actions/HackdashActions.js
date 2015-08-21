
import { AppDispatcher } from "../dispatcher";
import { HackdashConstants } from "../constants";

export default {

  find(query) {
    AppDispatcher.dispatch({
      type: HackdashConstants.FIND,
      query
    });
  },

  findOne(domain) {
    AppDispatcher.dispatch({
      type: HackdashConstants.FINDONE,
      domain
    });
  },

  receive(dashboards) {
    AppDispatcher.dispatch({
      type: HackdashConstants.RECEIVE,
      dashboards
    });
  },

  findProjects(domain) {
    AppDispatcher.dispatch({
      type: HackdashConstants.FIND_PROJECTS,
      domain
    });
  },

  receiveProjects(domain, projects) {
    AppDispatcher.dispatch({
      type: HackdashConstants.RECEIVE_PROJECTS,
      domain,
      projects
    });
  }

};
