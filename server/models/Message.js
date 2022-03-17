const axios = require('axios').default;

const config = require('../../config/config');
const HttpError = require('../utils/HttpError');

const Message = ({
  id,
  author_handle,
  recipient_handle,
  body,
  type,
  subject,
  composed_at,
  survey_id,
  survey_response,
}) =>
  Object.freeze({
    id,
    author_handle,
    recipient_handle,
    body,
    type,
    subject,
    composed_at,
    survey_id,
    survey_response,
  });

const createMessage = async (messageObject) => {
  const messageToCreate = Message(messageObject);

  if (!messageToCreate.id)
    throw new HttpError(422, 'id cannot be empty');

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
