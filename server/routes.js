const express = require('express');

const router = express.Router();
const { handlerWrapper } = require('./utils/utils');

const {
  walletRegistrationPost,
} = require('./handlers/walletRegistrationHandler');
const {
  deviceConfigurationPost,
} = require('./handlers/deviceConfigurationHandler');
// const { sessionPost } = require('./handlers/sessionHandler');
// const { capturePost } = require('./handlers/captureHandler');

// router
//   .route('/wallet_registration')
//   .post(handlerWrapper(walletRegistrationPost));

router.post('/device_configuration', handlerWrapper(deviceConfigurationPost));

// router.route('/session').post(handlerWrapper(sessionPost));
// router.route('/capture').post(handlerWrapper(capturePost));

module.exports = router;
