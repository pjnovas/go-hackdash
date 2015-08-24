
import Fingerprint2 from "fingerprintjs2";
import request from "superagent";
import { PollActions } from "../actions";

class PollAPI {

  constructor(){
    this.uri = "/api/polls/";
    this.type = "POLL";

    let fp = new Fingerprint2();
    fp.get( result => this.fingerprint = result );
  }

  find() {

    request
      .get(this.uri)
      .end( (err, res) => {
        if (this.errorHandler(err, "find")){
          return;
        }

        PollActions.receive(res.body);
      });
  }

  findOne(id) {

    request
      .get(this.uri + id)
      .end( (err, res) => {
        if (this.errorHandler(err, "findOne")){
          return;
        }

        PollActions.receive(res.body);
        this.findVotes(res.body.id);
      });
  }

  findVotes(id){

    request
      .get(this.uri + id + "/votes")
      .set("fingerprint", this.fingerprint)
      .end( (err, res) => {
        if (this.errorHandler(err, "findVotes")){
          return;
        }

        PollActions.receiveVotes(id, res.body);
      });
  }

  create(poll){
    request
      .post(this.uri)
      .send(poll)
      .end( (err, res) => {
        if (this.errorHandler(err, "create")){
          return;
        }

        PollActions.receive(res.body);
      });
  }

  update(id, poll){
    request
      .put(this.uri + id)
      .send(poll)
      .end( (err, res) => {
        if (this.errorHandler(err, "update")){
          return;
        }

        PollActions.receive(res.body);
      });
  }

  generateToken(id){
    request
      .post(this.uri + id + "/token")
      .end( (err, res) => {
        if (this.errorHandler(err, "generateToken")){
          return;
        }

        PollActions.receive(res.body);
      });
  }

  vote(id, projectId){
    request
      .post(this.uri + id + "/votes/" + projectId)
      .set("fingerprint", this.fingerprint)
      .end( (err, res) => {
        if (this.errorHandler(err, "vote")){
          return;
        }

        PollActions.receiveVotes(id, res.body);
      });
  }

  unvote(id, projectId){
    request
      .del(this.uri + id + "/votes/" + projectId)
      .set("fingerprint", this.fingerprint)
      .end( (err, res) => {
        if (this.errorHandler(err, "unvote")){
          return;
        }

        PollActions.receiveVotes(id, res.body);
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

const instance = new PollAPI();
export default instance;

export const API = PollAPI;
