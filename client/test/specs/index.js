import "babel-core/polyfill";

import { expect } from "chai";

// mock for socketio
window.io = {
  connect: function(){
    return {
      on: function() {}
    };
  }
};

require("./stores");
