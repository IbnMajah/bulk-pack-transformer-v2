const axios = require('axios').default;

const { treetrackerFieldDataUrl } = require('../../config/config');

const createSession = async (sessionObject) => {
  // post to the field-data microservice
  await axios.post(`${treetrackerFieldDataUrl}/session`, sessionObject);
};

module.exports = {
  createSession,
};
