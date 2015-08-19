
describe('API', () => {

  it ('must return 200 ok', done => {
    let agent = request.agent(server);
    agent.get('/').expect(200).end(done);
  });

  require('./polls');

});
