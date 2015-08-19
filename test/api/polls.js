
import {Poll} from 'lib/models';

describe('Polls', () => {

  let polls = [], agent, newPoll;

  before( done => {
    agent = request.agent(server);

    Poll.create([{
      dashboard: 'dash1',
      title: 'poll 1'
    }, {
      dashboard: 'dash2',
      title: 'poll 2'
    }, {
      dashboard: 'dash3',
      title: 'poll 3',
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
    agent.get('/api/polls').expect(200).end((err, res) => {
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(2);
      done();
    });
  });

  it ('must return a poll by id if isPublic', done => {
    let id = polls[0]._id;
    agent.get('/api/polls/' + id).expect(200).end((err, res) => {
      expect(res.body._id).to.be.equal(id.toString());
      done();
    });
  });

  it ('must NOT return a poll by id if is not public', done => {
    agent.get('/api/polls/' + polls[2]._id).expect(404).end(done);
  });

  it ('must always return a poll by token', done => {

    agent.get('/api/polls/' + polls[0].token).expect(200).end((err, res) => {
      expect(res.body._id).to.be.equal(polls[0]._id.toString());

      agent.get('/api/polls/' + polls[2].token).expect(200).end((err, res) => {
        expect(res.body._id).to.be.equal(polls[2]._id.toString());
        done();
      });
    });
  });

  it ('must allow to generate a new token', done => {
    let prevToken = polls[0].token;

    agent.post('/api/polls/' + polls[0]._id + '/token').expect(200).end((err, res) => {
      expect(res.body._id).to.be.equal(polls[0]._id.toString());
      expect(res.body.token).to.not.be.equal(prevToken);

      agent.get('/api/polls/' + res.body.token).expect(200).end(done);
    });
  });

  it ('must allow to create a Poll', done => {
    const poll = {
      title: 'hello',
      dashboard: 'dash666',
      token: 'false-token',
      isPublic: true,
      open: false,
      votes: 5
    };

    agent.post('/api/polls').expect(200).send(poll).end((err, res) => {
      let _poll = res.body;

      expect(_poll._id).to.be.ok;

      expect(_poll.token).to.be.ok;
      expect(_poll.token).to.not.be.equal(poll.token);

      expect(_poll.title).to.be.equal(poll.title);
      expect(_poll.dashboard).to.be.equal(poll.dashboard);
      expect(_poll.isPublic).to.be.equal(poll.isPublic);
      expect(_poll.open).to.be.equal(poll.open);
      expect(_poll.votes).to.be.equal(poll.votes);

      expect(new Date(_poll.created_at)).to.be.lessThan(Date.now());
      expect(new Date(_poll.updated_at)).to.be.lessThan(Date.now());

      newPoll = _poll; // set this poll for next test of update

      done();
    });
  });

  it ('must allow to update a Poll', done => {
    const id = newPoll._id;
    const poll = {
      title: 'hello 1',
      dashboard: 'dash666 2',
      token: 'false-token',
      isPublic: false,
      open: true,
      votes: 10
    };

    agent.put('/api/polls/' + id).expect(200).send(poll).end((err, res) => {
      let _poll = res.body;

      expect(_poll._id).to.be.equal(id);
      expect(_poll.token).to.be.equal(newPoll.token);

      expect(_poll.title).to.be.equal(poll.title);
      expect(_poll.dashboard).to.be.equal(poll.dashboard);
      expect(_poll.isPublic).to.be.equal(poll.isPublic);
      expect(_poll.open).to.be.equal(poll.open);
      expect(_poll.votes).to.be.equal(poll.votes);

      expect(new Date(_poll.created_at)).to.be.eql(new Date(newPoll.created_at));
      expect(new Date(_poll.updated_at)).to.be.greaterThan(new Date(newPoll.updated_at));
      expect(new Date(_poll.updated_at)).to.be.lessThan(Date.now());
      done();
    });
  });

});
