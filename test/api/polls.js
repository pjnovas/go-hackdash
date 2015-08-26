
import request from 'supertest';
import {expect} from 'chai';

import cobbler from 'cobbler';
import {Poll} from 'lib/models';

describe('Polls', () => {

  let polls = [], agent, newPoll, passport;

  before( done => {
    agent = request.agent(server);

    Poll.create([{
      dashboard: 'dash1',
      title: 'poll 1',
      owner: users[1]._id
    }, {
      dashboard: 'dash2',
      title: 'poll 2',
      owner: users[1]._id
    }, {
      dashboard: 'dash3',
      title: 'poll 3',
      owner: users[0]._id,
      isPublic: false
    }, {
      dashboard: 'dash3',
      title: 'poll 4',
      owner: users[0]._id,
    }, {
      dashboard: 'dash2',
      title: 'poll 5',
      owner: users[1]._id,
      isPublic: false
    }], (err, _polls) => {
      polls = _polls;
      done(err);
    });

  });

  after( done => {
    Poll.remove({}, done);
  });

  it ('must return first N public polls', done => {
    agent.get('/api/polls/latest').expect(200).end((err, res) => {
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(3);

      res.body.forEach( poll => {
        expect(poll.id).to.be.ok;
        expect(poll._id).to.not.be.ok;
        expect(poll.token).to.not.be.ok;
      });

      done();
    });
  });

  it ('must return my polls', done => {
    passport = cobbler('session', users[1].id);

    agent.get('/api/polls').expect(200).end((err, res) => {
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(3);

      res.body.forEach( poll => {
        expect(poll.id).to.be.ok;
        expect(poll._id).to.not.be.ok;
        expect(poll.token).to.be.ok;
        expect(poll.owner).to.be.equal(users[1].id.toString());
      });

      passport.restore();
      done();
    });
  });

  it ('must return forbidden if user is not auth', done => {
    let agent2 = request.agent(server);
    agent2.get('/api/polls').expect(401).end((err, res) => {
      expectCode(401, res);
      done();
    });
  });

  it ('must return a poll by id if isPublic', done => {
    let id = polls[3]._id;
    agent.get('/api/polls/' + id).expect(200).end((err, res) => {
      expect(res.body._id).to.not.be.ok;
      expect(res.body.id).to.be.equal(id.toString());
      expect(res.body.token).to.not.be.ok;
      done();
    });
  });

  it ('must NOT return a poll by id if is not public', done => {
    agent.get('/api/polls/' + polls[2]._id).expect(404).end((err, res) => {
      expectCode(404, res);
      done();
    });
  });

  it ('must return a poll by id if is not public and the owner request it', done => {
    passport = cobbler('session', users[0].id);

    agent.get('/api/polls/' + polls[2]._id).expect(200).end((err, res) => {
      expectCode(200, res);
      passport.restore();
      done();
    });
  });

  it ('must always return a poll by token', done => {

    agent.get('/api/polls/' + polls[0].token).expect(200).end((err, res) => {
      expect(res.body.id).to.be.equal(polls[0]._id.toString());
      expect(res.body.token).to.be.equal(polls[0].token);

      agent.get('/api/polls/' + polls[2].token).expect(200).end((err, res) => {
        expect(res.body.id).to.be.equal(polls[2]._id.toString());
        expect(res.body.token).to.be.equal(polls[2].token);
        done();
      });
    });
  });

  it ('must allow to generate a new token', done => {
    let prevToken = polls[0].token;

    passport = cobbler('session', users[1].id);

    agent.post('/api/polls/' + polls[0]._id + '/token').expect(200).end((err, res) => {
      expectCode(200, res);
      expect(res.body.id).to.be.equal(polls[0]._id.toString());
      expect(res.body.token).to.not.be.equal(prevToken);

      passport.restore();

      agent.get('/api/polls/' + res.body.token).expect(200).end(done);
    });
  });

  it ('must NOT allow to generate a new token if is not the owner', done => {
    passport = cobbler('session', users[0].id);

    agent.post('/api/polls/' + polls[0]._id + '/token').expect(403).end((err, res) => {
      expectCode(403, res);
      passport.restore();
      done();
    });
  });

  it ('must allow to create a Poll', done => {
    const poll = {
      title: 'hello',
      dashboard: 'dash666',
      token: 'false-token',
      isPublic: true,
      open: false
    };

    passport = cobbler('session', users[0].id);
    agent.post('/api/polls').expect(200).send(poll).end((err, res) => {
      let _poll = res.body;

      expect(_poll.id).to.be.ok;

      expect(_poll.token).to.be.ok;
      expect(_poll.token).to.not.be.equal(poll.token);

      expect(_poll.title).to.be.equal(poll.title);
      expect(_poll.dashboard).to.be.equal(poll.dashboard);
      expect(_poll.isPublic).to.be.equal(poll.isPublic);
      expect(_poll.open).to.be.equal(poll.open);

      expect(new Date(_poll.created_at)).to.be.lessThan(Date.now());
      expect(new Date(_poll.updated_at)).to.be.lessThan(Date.now());

      newPoll = _poll; // set this poll for next test of update
      passport.restore();
      done();
    });
  });

  it ('must allow to update a Poll', done => {
    const id = newPoll.id;
    const poll = {
      title: 'hello 1',
      dashboard: 'dash666 2',
      token: 'false-token',
      isPublic: true,
      open: true
    };

    passport = cobbler('session', users[0].id);
    agent.put('/api/polls/' + id).expect(200).send(poll).end((err, res) => {
      let _poll = res.body;

      expect(_poll.id).to.be.equal(id);
      expect(_poll.token).to.be.equal(newPoll.token);
      expect(_poll.dashboard).to.be.equal(newPoll.dashboard);

      expect(_poll.title).to.be.equal(poll.title);
      expect(_poll.isPublic).to.be.equal(poll.isPublic);
      expect(_poll.open).to.be.equal(poll.open);

      expect(new Date(_poll.created_at)).to.be.eql(new Date(newPoll.created_at));
      expect(new Date(_poll.updated_at)).to.be.greaterThan(new Date(newPoll.updated_at));
      expect(new Date(_poll.updated_at)).to.be.lessThan(Date.now());

      passport.restore();
      done();
    });
  });

  it ('must NOT allow to update a Poll', done => {
    const id = newPoll.id;
    passport = cobbler('session', users[1].id);
    agent.put('/api/polls/' + id).expect(403).send({ title: 'will not update' }).end((err, res) => {
      expectCode(403, res);
      passport.restore();
      done();
    });
  });

  it ('must NOT allow to delete a Poll', done => {
    const id = newPoll.id;
    passport = cobbler('session', users[1].id);
    agent.delete('/api/polls/' + id).expect(403).end((err, res) => {
      expectCode(403, res);
      passport.restore();
      done();
    });
  });

  it ('must allow to delete a Poll', done => {
    const id = newPoll.id;

    passport = cobbler('session', users[0].id);
    agent.delete('/api/polls/' + id).expect(204).end((err, res) => {
      expectCode(204, res);

      agent.get('/api/polls/' + id).expect(404).end((err, res) => {
        expectCode(404, res);
        passport.restore();
        done();
      });
    });
  });

});
