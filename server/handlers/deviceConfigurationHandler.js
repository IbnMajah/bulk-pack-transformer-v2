const log = require('loglevel');
const convertStringToUuid = require('uuid-by-string');

const {
  createDeviceConfiguration,
  DeviceConfiguration,
} = require('../models/DeviceConfiguration');

const deviceConfigurationPost = async function (req, res, next) {
  log.log('/device_configurations');
  try {
    const { body } = req;
    await createDeviceConfiguration(DeviceConfiguration(body));
    log.log('/device_configurations done');
    res.status(200).json();
  } catch (e) {
    next(e);
  }
};

const LegacyDevicePost = async function (req, res, next) {
  log.log('/v1/device');
  try {
    const {
      device_identifier,
      app_version,
      app_build,
      manufacturer,
      brand,
      model,
      hardware,
      device,
      serial,
      ios_release,
      ios_sdk_version,
      androidRelease,
      androidSdkVersion,
      logged_at = new Date().toISOString(),
      key,
    } = req.body;
    await createDeviceConfiguration(
      DeviceConfiguration({
        id: convertStringToUuid(device_identifier),
        device_identifier,
        app_version,
        app_build,
        manufacturer,
        brand,
        model,
        hardware,
        device,
        serial,
        os_version: androidRelease || ios_release,
        sdk_version: androidSdkVersion || ios_sdk_version,
        logged_at,
        key,
      }),
    );
    log.log('/v1/device done');
    res.status(200).json();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  deviceConfigurationPost,
  LegacyDevicePost,
};
