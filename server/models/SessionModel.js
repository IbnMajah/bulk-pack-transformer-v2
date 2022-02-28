const axios = require('axios').default;

const config = require('../../config/config');

const Session = ({
  id,
  device_configuration_id,
  originating_wallet_registration_id,
  target_wallet,
  check_in_photo_url,
  track_url,
  organization,
}) =>
  Object.freeze({
    id,
    device_configuration_id,
    originating_wallet_registration_id,
    target_wallet,
    check_in_photo_url,
    track_url,
    organization,
  });

const createSession = async (sessionObject) => {
  // post to the field-data microservice
  await axios.post(
    `${config.treetrackerFieldDataUrl}/session`,
    Session(sessionObject),
  );
};

module.exports = {
  createSession,
  Session,
};
