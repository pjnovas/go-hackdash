
import _ from "lodash";
import { expect } from "chai";
import sinon from "sinon";

import { PollStore } from "../../../src/stores";
import { PollAPI } from "../../../src/api";
import { PollActions } from "../../../src/actions";

describe("PollStore", function(){

  describe('FIND', function(){
    let server;

    before(() => { server = sinon.fakeServer.create(); });
    after(() => { server.restore(); });

    it("must call PollAPI, fire a RECIEVE action an a change event on Store", function(done){

      expect(PollAPI.uri).to.be.equal("/api/polls/");

      server.respondWith("GET", PollAPI.uri, [
        200, { "Content-Type": "application/json" },
        JSON.stringify([
          { "id": 10, "title": "poll 1", "dashboard": "dash1" },
          { "id": 11, "title": "poll 2", "dashboard": "dash2" }
        ])
      ]);

      let event = PollStore.addListener(() => {

        let polls = PollStore.getState();
        expect(polls).to.be.an("array");
        expect(polls.length).to.be.equal(2);

        expect(polls[0].id).to.be.equal(10);
        expect(polls[0].title).to.be.equal("poll 1");

        expect(polls[1].id).to.be.equal(11);
        expect(polls[1].title).to.be.equal("poll 2");

        event.remove();
        PollStore.clear();

        done();
      });

      PollActions.find();
      server.respond();
    });

  });

  describe('RECIEVE', function(){

    after(() => { PollStore.clear(); });

    it("must add polls and fire change event", function(done){

      let event = PollStore.addListener(() => {

        let polls = PollStore.getState();
        expect(polls).to.be.an("array");
        expect(polls.length).to.be.equal(2);

        event.remove();
        done();
      });

      PollActions.receive([{
        id: "1",
        title: "poll 1"
      },{
        id: "2",
        title: "poll 2"
      }]);

    });

    it("must fire change only if state changed", function(){
      let fires = 0;

      let event = PollStore.addListener(() => {
        fires++;
      });

      let gs = [{
        id: "3",
        title: "poll 3"
      }];

      PollActions.receive(gs);
      expect(fires).to.be.equal(1);
      PollActions.receive(gs);
      expect(fires).to.be.equal(1);

      gs[0].title = "poll changed";
      PollActions.receive(gs);
      var polls = PollStore.getState();
      expect(polls.length).to.be.equal(3);

      expect(polls[2].title).to.be.equal("poll changed");
      expect(fires).to.be.equal(2);

      event.remove();
    });
  });

  describe('FINDONE', function(){
    let server, pid = "12345";

    before(function () {
      server = sinon.fakeServer.create();
      server.autoRespond = true;
    });

    after(function () {
      server.restore();
      PollStore.clear();
    });

    it("must call PollAPI, fire 2 change events", function(done){
      let pURL = PollAPI.uri + pid;
      let votesURL = pURL + "/votes";

      server.respondWith("GET", pURL, [
        200, { "Content-Type": "application/json" },
        JSON.stringify({
          "id": pid,
          "title": "title server " + pid,
          "dashboard": "dash1"
        })
      ]);

      server.respondWith("GET", votesURL, [
        200, { "Content-Type": "application/json" },
        JSON.stringify([{
          projectId: "1235",
          votes: 5,
          voted: true
        },{
          projectId: "1236",
          votes: 2,
          voted: false
        }])
      ]);

      let calls = 0;
      let event = PollStore.addListener(() => {
        calls++;

        let polls = PollStore.getState();
        expect(polls).to.be.an("array");
        expect(polls.length).to.be.equal(1);

        let poll = polls[0];

        expect(poll.id).to.be.equal(pid);
        expect(poll.title).to.be.equal("title server " + pid);

        switch (calls) {
          case 1:
            expect(poll.votes).to.not.be.ok;
            break;
          case 2:
            expect(poll.votes).to.be.an('array');
            expect(poll.votes.length).to.be.equal(2);

            event.remove();
            done();
            break;
        }

      });

      PollActions.findOne(pid);
    });

    it("must merge votes if a new one come into the store", function(done){
      expect(PollStore.getState().length).to.be.equal(1);

      let event = PollStore.addListener(() => {
        let polls = PollStore.getState();

        expect(polls).to.be.an("array");
        expect(polls.length).to.be.equal(1);

        let poll = polls[0];

        expect(poll.id).to.be.equal(pid);
        expect(poll.title).to.be.equal("title server " + pid);

        expect(poll.votes).to.be.an("array");
        expect(poll.votes.length).to.be.equal(3);

        event.remove();
        done();
      });

      PollActions.receiveVotes(pid, {
        projectId: "1237",
        votes: 5,
        voted: false
      });

    });

  });

  describe('CREATE', function(){
    let server;

    before(function () {
      server = sinon.fakeServer.create();
      server.autoRespond = true;
    });

    after(function () {
      server.restore();
      PollStore.clear();
    });

    it("must call PollAPI, creating a Poll, receiving it and updating the store", function(done){
      let pURL = PollAPI.uri;

      let newPoll = {
        "title": "new poll title",
        "dashboard": "dash1"
      };

      let resPoll = _.assign({
        id: "2345",
        token: "token-code"
      }, newPoll);

      server.respondWith("POST", pURL, [
        200, { "Content-Type": "application/json" },
        JSON.stringify(resPoll)
      ]);

      expect(PollStore.getState().length).to.be.equal(0);

      let calls = 0;
      let event = PollStore.addListener(() => {
        calls++;

        let polls = PollStore.getState();
        expect(polls).to.be.an("array");
        expect(polls.length).to.be.equal(1);

        let poll = polls[0];

        expect(poll.id).to.be.equal(resPoll.id);
        expect(poll.token).to.be.equal(resPoll.token);
        expect(poll.title).to.be.equal(resPoll.title);
        expect(poll.dashboard).to.be.equal(resPoll.dashboard);

        expect(poll.votes).to.not.be.ok;
        event.remove();
        done();

      });

      PollActions.create(newPoll);
    });

  });

  describe('UPDATE', function(){
    let server;

    before(function () {
      server = sinon.fakeServer.create();
      server.autoRespond = true;
    });

    after(function () {
      server.restore();
      PollStore.clear();
    });

    it("must call PollAPI, updating a Poll, receiving it and updating the store", function(done){
      let pURL = PollAPI.uri, pid = "3456";

      let thePoll = {
        id: pid,
        token: "token-code",
        "title": "new poll title",
        "dashboard": "dash1"
      };

      // fire a recieve first to fill the store
      PollActions.receive(thePoll);

      let updPoll = {
        title: "updated title"
      };

      let resPoll = _.assign(thePoll, updPoll);

      server.respondWith("PUT", pURL + pid, [
        200, { "Content-Type": "application/json" },
        JSON.stringify(resPoll)
      ]);

      expect(PollStore.getState().length).to.be.equal(1);

      let event = PollStore.addListener(() => {

        let polls = PollStore.getState();
        expect(polls).to.be.an("array");
        expect(polls.length).to.be.equal(1);

        let poll = polls[0];

        expect(poll.id).to.be.equal(resPoll.id);
        expect(poll.token).to.be.equal(resPoll.token);
        expect(poll.title).to.be.equal(resPoll.title);
        expect(poll.dashboard).to.be.equal(resPoll.dashboard);

        expect(poll.votes).to.not.be.ok;
        event.remove();
        done();

      });

      PollActions.update(pid, updPoll);
    });

  });

  describe('REMOVE', function(){
    let server;

    before(function () {
      server = sinon.fakeServer.create();
      server.autoRespond = true;
    });

    after(function () {
      server.restore();
      PollStore.clear();
    });

    it("must call PollAPI, removing a Poll, and updating the store", function(done){
      let pURL = PollAPI.uri, pid1 = "3456", pid2 = "3457";

      let polls = [{
        id: pid1,
        token: "token-code2",
        "title": "new poll title",
        "dashboard": "dash1"
      }, {
        id: pid2,
        token: "token-code2",
        "title": "new poll title 2",
        "dashboard": "dash2"
      }];

      // fire a recieve first to fill the store
      PollActions.receive(polls);

      server.respondWith("DELETE", pURL + pid1, [
        204, { "Content-Type": "application/json" }, ""
      ]);

      expect(PollStore.getState().length).to.be.equal(2);

      let event = PollStore.addListener(() => {

        let polls = PollStore.getState();
        expect(polls).to.be.an("array");
        expect(polls.length).to.be.equal(1);

        let poll = polls[0];

        expect(poll.id).to.be.equal(pid2);

        event.remove();
        done();
      });

      PollActions.remove(pid1);
    });

  });

  describe('GENERATE_TOKEN', function(){
    let server;

    before(function () {
      server = sinon.fakeServer.create();
      server.autoRespond = true;
    });

    after(function () {
      server.restore();
      PollStore.clear();
    });

    it("must call PollAPI, generate a new Poll Token, receiving it and updating the store", function(done){
      let pURL = PollAPI.uri, pid = "3456";

      let thePoll = {
        id: pid,
        token: "token-code",
        "title": "new poll title",
        "dashboard": "dash1"
      };

      // fire a recieve first to fill the store
      PollActions.receive(thePoll);

      let updPoll = {
        token: "new-token-code"
      };

      let resPoll = _.assign(thePoll, updPoll);

      server.respondWith("POST", pURL + pid + "/token", [
        200, { "Content-Type": "application/json" },
        JSON.stringify(resPoll)
      ]);

      expect(PollStore.getState().length).to.be.equal(1);

      let event = PollStore.addListener(() => {

        let polls = PollStore.getState();
        expect(polls).to.be.an("array");
        expect(polls.length).to.be.equal(1);

        let poll = polls[0];

        expect(poll.id).to.be.equal(resPoll.id);
        expect(poll.token).to.be.equal(resPoll.token);
        expect(poll.title).to.be.equal(resPoll.title);
        expect(poll.dashboard).to.be.equal(resPoll.dashboard);

        expect(poll.votes).to.not.be.ok;
        event.remove();
        done();

      });

      PollActions.generateToken(pid);
    });

  });

  describe('VOTE', function(){
    let server;

    before(function () {
      server = sinon.fakeServer.create();
      server.autoRespond = true;
    });

    after(function () {
      server.restore();
      PollStore.clear();
    });

    it("must call PollAPI, set a project vote, receiving it and updating the store", function(done){
      let pURL = PollAPI.uri, pid = "3456";

      let thePoll = {
        id: pid,
        token: "token-code",
        "title": "new poll title",
        "dashboard": "dash1"
      };

      let theVotes = [{
        projectId: "1",
        votes: 5,
        voted: false
      }, {
        projectId: "2",
        votes: 10,
        voted: false
      }];

      // fire a recieve first to fill the store
      PollActions.receive(thePoll);
      PollActions.receiveVotes(pid, theVotes);

      let resVote0 = _.assign(theVotes[0], { votes: 6, voted: true });
      let resVote1 = _.assign(theVotes[1], { votes: 11, voted: true });

      server.respondWith("POST", pURL + pid + "/votes/" + theVotes[0].projectId, [
        200, { "Content-Type": "application/json" },
        JSON.stringify(resVote0)
      ]);

      server.respondWith("POST", pURL + pid + "/votes/" + theVotes[1].projectId, [
        200, { "Content-Type": "application/json" },
        JSON.stringify(resVote1)
      ]);

      let prePolls = PollStore.getState();
      expect(prePolls.length).to.be.equal(1);
      expect(prePolls[0].votes).to.be.an("array");
      expect(prePolls[0].votes.length).to.be.equal(2);

      let calls = 0;
      let event = PollStore.addListener(() => {
        calls++;

        let polls = PollStore.getState();
        expect(polls).to.be.an("array");
        expect(polls.length).to.be.equal(1);

        let poll = polls[0];
        expect(poll.votes.length).to.be.equal(2);

        switch(calls){
          case 1:
            expect(poll.votes[0].voted).to.be.equal(true);
            expect(poll.votes[0].votes).to.be.equal(6);
            expect(poll.votes[1].voted).to.be.equal(false);
            expect(poll.votes[1].votes).to.be.equal(10);
            break;
          case 2:
            expect(poll.votes[0].voted).to.be.equal(true);
            expect(poll.votes[0].votes).to.be.equal(6);
            expect(poll.votes[1].voted).to.be.equal(true);
            expect(poll.votes[1].votes).to.be.equal(11);

            event.remove();
            done();

            break;
        }

      });

      PollActions.vote(pid, theVotes[0].projectId);
      PollActions.vote(pid, theVotes[1].projectId);
    });

  });

  describe('UNVOTE', function(){
    let server;

    before(function () {
      server = sinon.fakeServer.create();
      server.autoRespond = true;
    });

    after(function () {
      server.restore();
      PollStore.clear();
    });

    it("must call PollAPI, remove a Project vote, receiving it and updating the store", function(done){
      let pURL = PollAPI.uri, pid = "3456";

      let thePoll = {
        id: pid,
        token: "token-code",
        "title": "new poll title",
        "dashboard": "dash1"
      };

      let theVotes = [{
        projectId: "1",
        votes: 10,
        voted: true
      }, {
        projectId: "2",
        votes: 2,
        voted: true
      }];

      // fire a recieve first to fill the store
      PollActions.receive(thePoll);
      PollActions.receiveVotes(pid, theVotes);

      let resVote0 = _.assign(theVotes[0], { votes: 9, voted: false });
      let resVote1 = _.assign(theVotes[1], { votes: 1, voted: false });

      server.respondWith("DELETE", pURL + pid + "/votes/" + theVotes[0].projectId, [
        200, { "Content-Type": "application/json" },
        JSON.stringify(resVote0)
      ]);

      server.respondWith("DELETE", pURL + pid + "/votes/" + theVotes[1].projectId, [
        200, { "Content-Type": "application/json" },
        JSON.stringify(resVote1)
      ]);

      let prePolls = PollStore.getState();
      expect(prePolls.length).to.be.equal(1);
      expect(prePolls[0].votes).to.be.an("array");
      expect(prePolls[0].votes.length).to.be.equal(2);

      let calls = 0;
      let event = PollStore.addListener(() => {
        calls++;

        let polls = PollStore.getState();
        expect(polls).to.be.an("array");
        expect(polls.length).to.be.equal(1);

        let poll = polls[0];
        expect(poll.votes.length).to.be.equal(2);

        switch(calls){
          case 1:
            expect(poll.votes[0].voted).to.be.equal(false);
            expect(poll.votes[0].votes).to.be.equal(9);
            expect(poll.votes[1].voted).to.be.equal(true);
            expect(poll.votes[1].votes).to.be.equal(2);
            break;
          case 2:
            expect(poll.votes[0].voted).to.be.equal(false);
            expect(poll.votes[0].votes).to.be.equal(9);
            expect(poll.votes[1].voted).to.be.equal(false);
            expect(poll.votes[1].votes).to.be.equal(1);

            event.remove();
            done();

            break;
        }

      });

      PollActions.unvote(pid, theVotes[0].projectId);
      PollActions.unvote(pid, theVotes[1].projectId);
    });

  });

});
