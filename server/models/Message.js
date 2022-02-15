const axios = require('axios').default;

const config = require('../../config/config');

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
  // send data to the messaging-api
  await axios.post(
    `${config.treetrackerMessagingApiUrl}/message`,
    Message(messageObject),
  );
};

module.exports = {
  createMessage,
  Message,
};
