const log = require('loglevel');

const { createMessage } = require('../models/Message');

const messagePost = async function (req, res, next) {
  log.log('/messages');
  try {
    await createMessage(req.body);
    log.log('/messages done');
    res.status(200).json();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  messagePost,
};
