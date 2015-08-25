
import request from "superagent";
import { HackdashActions } from "../actions";

class HackdashAPI {

  constructor(){
    const base = "https://hackdash.org/api/v2/";
    this.uris = {
      base,
      users: base + "users/",
      dashboards: base + "dashboards/",
      projects: "projects/"
    };

    this.type = "Hackdash";
  }

  find(query){
    request
      .get(this.uris.dashboards + "?q=" + query + "&limit=6")
      .end( (err, res) => {
        if (this.errorHandler(err, "find")){
          return;
        }

        HackdashActions.receive(res.body);
      });
  }

  findOne(domain) {
    request
      .get(this.uris.dashboards + domain)
      .end( (err, res) => {
        if (this.errorHandler(err, "findOne")){
          return;
        }

        HackdashActions.receive(res.body);
        this.findProjects(domain);
      });
  }

  findProjects(domain) {
    request
      .get(this.uris.base + domain + "/" + this.uris.projects)
      .end( (err, res) => {
        if (this.errorHandler(err, "findProjects")){
          return;
        }

        HackdashActions.receiveProjects(domain, res.body);
      });
  }

  errorHandler(err, type){

    if (err) {

      /* trigger error action
      this.emit("error", {
        api: this.type,
        type,
        status: err.status,
        response: err.response,
        body: err.response.body,
        text: err.response.text,
      });
      */

      return true;
    }
  }
}

const instance = new HackdashAPI();
export default instance;

export const API = HackdashAPI;
