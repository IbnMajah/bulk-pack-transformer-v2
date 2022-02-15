const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { default: axios } = require('axios');

chai.use(sinonChai);

const { expect } = chai;
const { createSession } = require('./SessionModel');
const config = require('../../config/config');

describe('Session Model', () => {
  it('should make a call to the session external API endpoint', async () => {
    const sessionObject = { micCheck: '5 6' };

    const axiosStub = sinon.stub(axios, 'post');
    const sessionUrlStub = sinon.stub(config, 'treetrackerFieldDataUrl');

    sessionUrlStub.get(() => 'sessionUrl');
    await createSession(sessionObject);
    expect(axiosStub).calledWith('sessionUrl/session', sessionObject);
    axiosStub.restore();
    sessionUrlStub.restore();
  });
});
