
import { PollActions } from "../actions";

class PollNotifier {

  constructor(){
    this.channel = "/polls";
    this.connected = false;

    this.roomJoined;

    let baseURL = location.origin || location.protocol + "//" + location.host;
    this.socket = io.connect(baseURL + this.channel);

    this.socket.on("connect", () => this.connected = true );
    this.socket.on("disconnect", () => this.connected = false );

    this.socket.on("update", (data) => {
      if (this.roomJoined === data.id){
        PollActions.receive(data);
      }
    });

    this.socket.on("vote", (data) => {
      if (this.roomJoined === data.poll){
        PollActions.receiveVotes(data.poll, data);
      }
    });
  }

  join(id) {

    if (this.roomJoined === id){
      return;
    }

    if (!this.connected){
      this.retryTimer = setTimeout(() => this.join(id), 1000);
    }

    this.socket.emit("join", id);
    this.roomJoined = id;
  }

  leave(id) {

    if (!this.roomJoined){
      return;
    }

    if (this.retryTimer){
      clearTimeout(this.retryTimer);
    }

    if (!this.connected){
      return;
    }

    this.socket.emit("leave", id);
    this.roomJoined = null;
  }

}

const instance = new PollNotifier();
export default instance;

export const API = PollNotifier;
