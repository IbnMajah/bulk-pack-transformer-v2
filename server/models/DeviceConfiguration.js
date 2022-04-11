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
  key,
  logged_at,
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
    app_build: `${app_build}`, // convert to string
    app_version,
    os_version,
    sdk_version: `${sdk_version}`, // convert to string,
    logged_at,
    bulk_pack_file_name: key,
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
