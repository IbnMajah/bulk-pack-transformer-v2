const axios = require('axios').default;

const config = require('../../config/config');

const DeviceConfiguration = ({
  device_identifier,
  brand,
  model,
  device,
  serial,
  hardware,
  manufacturer,
  app_build,
  app_version,
  os_version,
  sdk_version,
  id,
  logged_at = new Date().toISOString(), // defaults added to cater for data using v1
}) =>
  Object.freeze({
    id,
    device_identifier,
    brand,
    model,
    device,
    serial,
    hardware,
    manufacturer,
    app_build,
    app_version,
    os_version,
    sdk_version,
    logged_at,
  });

const createDeviceConfiguration = async (deviceConfigurationObject) => {
  // post to the field-data microservice
  await axios.post(`${config.treetrackerFieldDataUrl}/device-configuration`, {
    ...deviceConfigurationObject,
  });
};

module.exports = {
  createDeviceConfiguration,
  DeviceConfiguration,
};
