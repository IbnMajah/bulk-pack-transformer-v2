const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { default: axios } = require('axios');

chai.use(sinonChai);

const { expect } = chai;
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
      'type',
      'subject',
      'composed_at',
      'survey_id',
      'survey_response',
      'bulk_pack_file_name',
    ]);
  });

  it('should make a call to the message external API endpoint', async () => {
    const messageObject = {
      micCheck: '3 4',
      id: 'uuid',
      composed_at: '02/02/2022',
    };

    const axiosStub = sinon.stub(axios, 'post');
    const messageUrlStub = sinon.stub(config, 'treetrackerMessagingApiUrl');

    messageUrlStub.get(() => 'messageUrl');
    await createMessage(messageObject);
    expect(axiosStub).calledWith('messageUrl/message', {
      id: 'uuid',
      author_handle: undefined,
      recipient_handle: undefined,
      type: undefined,
      body: undefined,
      subject: undefined,
      composed_at: '02/02/2022',
      survey_id: undefined,
      survey_response: undefined,
    });
    axiosStub.restore();
    messageUrlStub.restore();
  });
});
