const axios = require('axios').default;

const config = require('../../config/config');

const createSession = async (sessionObject) => {
  // post to the field-data microservice
  await axios.post(`${config.treetrackerFieldDataUrl}/session`, sessionObject);
};

module.exports = {
  createSession,
};
