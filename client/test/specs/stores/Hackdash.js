
import { expect } from "chai";
import sinon from "sinon";

import { HackdashStore } from "../../../src/stores";
import { HackdashAPI } from "../../../src/api";
import { HackdashActions } from "../../../src/actions";

describe("HackdashStore", function(){

  describe('RECIEVE', function(){

    after(() => { HackdashStore.clear(); });

    it("must add dashboards and fire change event", function(done){

      expect(HackdashStore.getState().length).to.be.equal(0);

      let event = HackdashStore.addListener(() => {

        let dashboards = HackdashStore.getState();
        expect(dashboards).to.be.an("array");
        expect(dashboards.length).to.be.equal(2);

        event.remove();
        done();
      });

      HackdashActions.receive([{
        _id: "1",
        domain: "dash1",
        title: "dashboard 1"
      },{
        _id: "2",
        domain: "dash2",
        title: "dashboard 2"
      }]);

    });

  });

  describe('FINDONE', function(){
    let server, dash = "dashXYZ";

    before(function () {
      server = sinon.fakeServer.create();
      server.autoRespond = true;
    });

    after(function () {
      server.restore();
      HackdashStore.clear();
    });

    it("must call HackdashAPI, fire 2 change events", function(done){
      let dashURL = HackdashAPI.uris.dashboards + dash;
      let projectsURL = dashURL + "/" + HackdashAPI.uris.projects;

      server.respondWith("GET", dashURL, [
        200, { "Content-Type": "application/json" },
        JSON.stringify({
          "_id": "12345",
          "domain": dash,
          "title": "title dashboard " + dash
        })
      ]);

      server.respondWith("GET", projectsURL, [
        200, { "Content-Type": "application/json" },
        JSON.stringify([{
          _id: "1235",
          title: "project 1"
        },{
          _id: "1236",
          title: "project 2"
        }])
      ]);

      let calls = 0;
      let event = HackdashStore.addListener(() => {
        calls++;

        let dashboards = HackdashStore.getState();
        expect(dashboards).to.be.an("array");
        expect(dashboards.length).to.be.equal(1);

        let dashboard = dashboards[0];

        expect(dashboard._id).to.be.equal("12345");
        expect(dashboard.domain).to.be.equal(dash);
        expect(dashboard.title).to.be.equal("title dashboard " + dash);

        switch (calls) {
          case 1:
            expect(dashboard.projects).to.not.be.ok;
            break;
          case 2:
            expect(dashboard.projects).to.be.an('array');
            expect(dashboard.projects.length).to.be.equal(2);

            event.remove();
            done();
            break;
        }

      });

      HackdashActions.findOne(dash);
    });
/*
    it("must merge votes if a new one come into the store", function(done){
      expect(HackdashStore.getState().length).to.be.equal(1);

      let event = HackdashStore.addListener(() => {
        let dashboards = HackdashStore.getState();

        expect(dashboards).to.be.an("array");
        expect(dashboards.length).to.be.equal(1);

        let dashboard = dashboards[0];

        expect(dashboard.id).to.be.equal(pid);
        expect(dashboard.title).to.be.equal("title server " + pid);

        expect(dashboard.votes).to.be.an("array");
        expect(dashboard.votes.length).to.be.equal(3);

        event.remove();
        done();
      });

      HackdashActions.receiveVotes(pid, {
        projectId: "1235",
        votes: 5,
        voted: false
      });

    });
*/
  });
});
