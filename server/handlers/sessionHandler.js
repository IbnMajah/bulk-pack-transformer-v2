const log = require('loglevel');

const { createSession } = require('../models/SessionModel');

const sessionPost = async function (req, res, next) {
  log.log('/sessions');
  try {
    await createSession(req.body);
    log.log('/sessions done');
    res.status(200).json();
  } catch (e) {
    log.warn(e);
    next(e);
  }
};

module.exports = {
  sessionPost,
};
