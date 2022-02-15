const express = require('express');

const router = express.Router();
const { handlerWrapper } = require('./utils/utils');

const {
  walletRegistrationPost,
  LegacyPlanterPost,
} = require('./handlers/walletRegistrationHandler');
const { sessionPost } = require('./handlers/sessionHandler');
const { messagePost } = require('./handlers/messageHandler');
const {
  deviceConfigurationPost,
  LegacyDevicePost,
} = require('./handlers/deviceConfigurationHandler');
const {
  rawCapturePost,
  LegacyTreePost,
} = require('./handlers/rawCaptureHandler');

router.post('/wallet_registrations', handlerWrapper(walletRegistrationPost));
router.post('/device_configurations', handlerWrapper(deviceConfigurationPost));
router.post('/sessions', handlerWrapper(sessionPost));
router.post('/captures', handlerWrapper(rawCapturePost));
router.post('/messages', handlerWrapper(messagePost));

// Legacy V1
router.use(
  '/v1',
  router.post('/planter', handlerWrapper(LegacyPlanterPost)),
  router.post('/tree', handlerWrapper(LegacyTreePost)),
  router.put('/device', handlerWrapper(LegacyDevicePost)),
);

module.exports = router;
