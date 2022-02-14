const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { default: axios } = require('axios');
chai.use(sinonChai);

const expect = chai.expect;
const { Message, createMessage } = require('./Message');
const config = require('../../config/config');

describe('Message Model', () => {
  it('message Models should return defined fields', () => {
    const message = Message({});
    expect(message).to.have.keys([
      'id',
      'author_handle',
      'recipient_handle',
      'body',
      'subject',
      'composed_at',
      'survey_id',
      'survey_response',
    ]);
  });

  it('should make a call to the message external API endpoint', async () => {
    const messageObject = { micCheck: '3 4' };

    let axiosStub, messageUrlStub;

    axiosStub = sinon.stub(axios, 'post');
    messageUrlStub = sinon.stub(config, 'treetrackerMessagingApiUrl');

    messageUrlStub.get(() => 'messageUrl');
    await createMessage(messageObject);
    expect(axiosStub).calledWith('messageUrl/message', {
      id: undefined,
      author_handle: undefined,
      recipient_handle: undefined,
      body: undefined,
      subject: undefined,
      composed_at: undefined,
      survey_id: undefined,
      survey_response: undefined,
    });
    axiosStub.restore();
    messageUrlStub.restore();
  });
});
