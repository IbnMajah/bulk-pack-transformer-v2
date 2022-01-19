const DeviceConfiguration = ({
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
  created_at,
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
    created_at,
  });

module.exports = {
  DeviceConfiguration,
};
