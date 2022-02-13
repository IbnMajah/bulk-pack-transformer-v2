const axios = require('axios').default;
const convertStringToUuid = require('uuid-by-string');

const HttpError = require('../utils/HttpError');
const { treetrackerFieldDataUrl } = require('../../config/config');

const RawCapture = ({
  id,
  session_id,
  image_url,
  lat,
  lon,
  gps_accuracy,
  note,
  abs_step_count,
  delta_step_count,
  rotation_matrix,
  extra_attributes,
  capture_taken_at,
}) =>
  Object.freeze({
    id,
    session_id,
    image_url,
    lat,
    lon,
    gps_accuracy,
    note,
    abs_step_count,
    delta_step_count,
    rotation_matrix,
    extra_attributes,
    capture_taken_at,
  });

const createRawCapture = async (rawCaptureObject, v1Details) => {
  let rawCaptureObjectToCreate = { ...rawCaptureObject };
  if (v1Details) {
    const { device_identifier, planter_identifier } = v1Details;

    const deviceConfigurationId = convertStringToUuid(device_identifier);

    // same thing as the wallet registration id for v1
    const sessionId = convertStringToUuid(
      device_identifier + planter_identifier,
    );

    // check if device_identifier and planter_identifier exists, if it does then that is fine
    const existingDeviceResponse = await axios.get(
      `${treetrackerFieldDataUrl}/device-configuration/${deviceConfigurationId}`,
    );

    const existingWalletRegistrationResponse = await axios.get(
      `${treetrackerFieldDataUrl}/wallet-registration/${sessionId}`,
    );

    const existingDevice = existingDeviceResponse.data;
    const existingWalletRegistration = existingWalletRegistrationResponse.data;

    if (
      Object.keys(existingDevice).length === 0 ||
      Object.keys(existingWalletRegistration).length === 0
    ) {
      throw new HttpError(
        422,
        'The device and planter information must have been inserted before the raw_capture can be created',
      );
    }

    const sessionObject = {
      id: sessionId,
      device_configuration_id: deviceConfigurationId,
      originating_wallet_registration_id: sessionId,
      organization: existingWalletRegistration.v1_legacy_organization,
    };

    // create a session
    await axios.post(`${treetrackerFieldDataUrl}/session`, sessionObject);

    rawCaptureObjectToCreate = {
      ...rawCaptureObjectToCreate,
      session_id: sessionId,
    };
  }

  // post to the field-data microservice
  await axios.post(
    `${treetrackerFieldDataUrl}/raw-captures`,
    rawCaptureObjectToCreate,
  );
};

module.exports = {
  createRawCapture,
  RawCapture,
};
