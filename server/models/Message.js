const axios = require('axios').default;

const config = require('../../config/config');
const HttpError = require('../utils/HttpError');

const Message = ({
  message_uuid,
  author_handle,
  recipient_handle,
  body,
  subject,
  composed_at,
  survey_id,
  answers,
}) =>
  Object.freeze({
    id: message_uuid,
    author_handle,
    recipient_handle,
    body,
    subject,
    composed_at,
    survey_id,
    survey_response: answers,
  });

const createMessage = async (messageObject) => {
  const messageToCreate = Message(messageObject);

  if (!messageToCreate.id)
    throw new HttpError(422, 'message_uuid cannot be empty');

  if (!messageToCreate.composed_at)
    throw new HttpError(422, 'composed_at cannot be empty');
  // send data to the messaging-api
  await axios.post(
    `${config.treetrackerMessagingApiUrl}/message`,
    messageToCreate,
  );
};

module.exports = {
  createMessage,
  Message,
};
