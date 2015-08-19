
import request from 'supertest';
import {expect} from 'chai';

global.request = request;
global.expect = expect;

describe('(~˘▾˘)~  TESTS  ~(˘▾˘~)', () => {

  it ('yaaaay!', () => {
    expect(true).to.be.true;
  });

  require('./api');

});
