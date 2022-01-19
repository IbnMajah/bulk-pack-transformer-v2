// const Joi = require('joi');
// const log = require('loglevel');

// const { walletRegistration } = require('../models/WalletRegistration');

// const Session = require('../models/Session');

// const WalletRegistrationRepository = require('../infra/repositories/WalletRegistrationRepository');

// const walletRegistrationPost = async function (req, res) {
//   const session = new Session();
//   const walletRegistrationRepo = new WalletRegistrationRepository(session);

//   const executeCreateWalletRegistration = createWalletRegistration(
//     walletRegistrationRepo,
//   );

//   try {
//     const newWalletRegistration = walletRegistrationFromRequest({
//       ...walletRegistration,
//     });
//     await session.beginTransaction();
//     await executeCreateWalletRegistration(newWalletRegistration);
//     await session.commitTransaction();
//     res.status(204).json();
//   } catch (e) {
//     log.warn(e);
//     if (session.isTransactionInProgress()) {
//       await session.rollbackTransaction();
//     }
//     next(e);
//   }
// };

// module.exports = {
//   walletRegistrationPost,
// };
