
import request from 'supertest';
import {expect} from 'chai';

import {Vote} from 'lib/models';
import {Poll} from 'lib/models';
import {Types} from 'mongoose';

describe('Votes', () => {

  let votes = [], poll, agent;

  before( done => {
    agent = request.agent(server);

    Poll.create({
      dashboard: 'dash1',
      title: 'poll 1',
      owner: users[0]._id
    }, (err, _poll) => {
      poll = _poll;

      Vote.create([{
        projectId: Types.ObjectId().toString(),
        poll: poll._id,
        fingerprints: ['a']
      }, {
        projectId: Types.ObjectId().toString(),
        poll: poll._id,
        fingerprints: ['a', 'b']
      }, {
        projectId: Types.ObjectId().toString(),
        poll: poll._id,
        fingerprints: ['a', 'b', 'c']
      }], (err, _votes) => {
        votes = _votes;
        done(err);
      });

    });
  });

  after( done => {
    Vote.remove({}, () => {
      Poll.remove(done);
    });
  });

  it ('must not allow to request without a fingerprint', done => {
    agent.get('/api/polls/' + poll.token + '/votes')
      .expect(400)
      .end(done);
  });

  it ('must allow to fetch all project votes', done => {
    let fingerprint = 'b';

    agent.get('/api/polls/' + poll.token + '/votes')
      .set('fingerprint', fingerprint)
      .expect(200)
      .end((err, res) => {
        let pvotes = res.body;

        expect(pvotes).to.be.an('array');
        expect(pvotes.length).to.be.equal(3);

        pvotes.forEach( (p, i) => {
          expect(p.projectId).to.be.ok;

          expect(p.votes).to.be.a('number');
          expect(p.votes).to.be.equal(votes[i].fingerprints.length);

          if (votes[i].fingerprints.indexOf(fingerprint) > -1){
            expect(p.voted).to.be.equal(true);
          }
          else {
            expect(p.voted).to.be.equal(false);
          }
        });

        done();
      });
  });

  it ('must allow to vote a project', done => {
    let v = votes[0];
    let fingerprint = 'b';

    agent.post('/api/polls/' + poll.token + '/votes/' + v.projectId)
      .set('fingerprint', fingerprint)
      .expect(200)
      .end((err, res) => {
        let _v = res.body;

        expect(_v.projectId).to.be.equal(v.projectId);
        expect(_v.votes).to.be.equal(v.fingerprints.length + 1);
        expect(_v.voted).to.be.equal(true);

        v.fingerprints.push(fingerprint);

        done();
      });
  });

  it ('must allow to vote a project which has no votes yet', done => {
    let fingerprint = 'b';
    let newId = Types.ObjectId().toString();

    agent.post('/api/polls/' + poll.token + '/votes/' + newId)
      .set('fingerprint', fingerprint)
      .expect(200)
      .end((err, res) => {
        let _v = res.body;

        expect(_v.projectId).to.be.equal(newId);
        expect(_v.votes).to.be.equal(1);
        expect(_v.voted).to.be.equal(true);

        done();
      });
  });

  it ('must VALIDATE ProjectID is a valid Mongo ObjectId', done => {
    let fingerprint = 'd';

    agent.post('/api/polls/' + poll.token + '/votes/XYZ')
      .set('fingerprint', fingerprint)
      .expect(400)
      .end(done);

  });

  it ('must allow to unvote a project', done => {
    let v = votes[0];
    let fingerprint = 'b';

    agent.delete('/api/polls/' + poll.token + '/votes/' + v.projectId)
      .set('fingerprint', fingerprint)
      .expect(200)
      .end((err, res) => {
        let _v = res.body;

        expect(_v.projectId).to.be.equal(v.projectId);
        expect(_v.votes).to.be.equal(v.fingerprints.length - 1);
        expect(_v.voted).to.be.equal(false);

        v.fingerprints.push(fingerprint);

        done();
      });

  });

  it ('must NOT allow to vote or unvote a project if is not an open poll', done => {
    let fingerprint = 'k';
    let newId = Types.ObjectId().toString();

    poll.open = false;

    poll.save( (err, _poll) => {
      expect(_poll.open).to.be.equal(false);

      agent.post('/api/polls/' + poll.token + '/votes/' + newId)
        .set('fingerprint', fingerprint)
        .expect(403)
        .end((err, res) => {

          agent.delete('/api/polls/' + poll.token + '/votes/' + newId)
            .set('fingerprint', fingerprint)
            .expect(403)
            .end(done);

        });

    });

  });

});
