const BaseRepository = require('./BaseRepository');

class DeviceConfigurationRepository extends BaseRepository {
  constructor(session) {
    super('device_configuration', session);
    this._tableName = 'device_configuration';
    this._session = session;
  }
}

module.exports = DeviceConfigurationRepository;
