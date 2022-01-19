const Joi = require('joi');
const log = require('loglevel');

const { DeviceConfiguration } = require('../models/deviceConfiguration');

const Session = require('../models/Session');

const DeviceConfigurationRepository = require('../repositories/DeviceConfigurationRepository');

const deviceConfigurationPostQuerySchema = Joi.object({
  id: Joi.string().uuid().required(),
  device_identifier: Joi.string().required(),
  brand: Joi.string().required(),
  model: Joi.string().required(),
  device: Joi.string().required(),
  serial: Joi.string().required(),
  hardware: Joi.string().required(),
  manufacturer: Joi.string().required(),
  app_build: Joi.string().required(),
  app_version: Joi.string().required(),
  os_version: Joi.string().required(),
  sdk_version: Joi.string().required(),
  logged_at: Joi.string().isoDate().required(),
}).unknown(false);

const deviceConfigurationPost = async function (req, res, next) {
  await deviceConfigurationPostQuerySchema.validateAsync(req.body, {
    abortEarly: false,
  });

  const session = new Session();
  const deviceConfigurationRepo = new DeviceConfigurationRepository(session);

  try {
    const newDeviceConfiguration = {
      ...DeviceConfiguration(req.body),
      created_at: new Date().toISOString(),
    };
    const { id, device_identifier } = newDeviceConfiguration;
    const existingDeviceConfiguration =
      await deviceConfigurationRepo.getByFilter({
        or: [{ id }, { device_identifier }],
      });

    if (existingDeviceConfiguration.length === 0) {
      await session.beginTransaction();
      await deviceConfigurationRepo.create(newDeviceConfiguration);
      await session.commitTransaction();
    }
    res.status(204).json();
  } catch (e) {
    log.warn(e);
    if (session.isTransactionInProgress()) {
      await session.rollbackTransaction();
    }
    next(e);
  }
};

module.exports = {
  deviceConfigurationPost,
};
