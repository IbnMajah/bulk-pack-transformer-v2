const log = require('loglevel');

const { createRawCapture, RawCapture } = require('../models/RawCapture');

const rawCapturePost = async function (req, res, next) {
  log.log('/captures');
  try {
    const { body } = req;
    body.captured_at = new Date(body.captured_at).toISOString()
    await createRawCapture(RawCapture(body));
    log.log('/captures done');
    res.status(200).json();
  } catch (e) {
    next(e);
  }
};

const LegacyTreePost = async function (req, res, next) {
  log.log('/v1/tree');
  try {
    const {
      uuid,
      image_url,
      lat,
      lon,
      gps_accuracy,
      note,
      device_identifier,
      planter_identifier,
      timestamp,
    } = req.body;

    const { attributes } = req.body;

    const absStepCountIndex = attributes.findIndex(
      (a) => a.key === 'abs_step_count',
    );
    const absStepCountArray = attributes.splice(absStepCountIndex, 1);
    const [abs_step_count] = absStepCountArray;

    const deltaStepCountIndex = attributes.findIndex(
      (a) => a.key === 'delta_step_count',
    );
    const deltaStepCountArray = attributes.splice(deltaStepCountIndex, 1);
    const [delta_step_count] = deltaStepCountArray;

    const rotationMatrixIndex = attributes.findIndex(
      (a) => a.key === 'rotation_matrix',
    );
    const rotationMatrixArray = attributes.splice(rotationMatrixIndex, 1);
    const [rotation_matrix] = rotationMatrixArray;

    await createRawCapture(
      RawCapture({
        id: uuid,
        image_url,
        lat,
        lon,
        gps_accuracy,
        note,
        abs_step_count: abs_step_count?.value ?? 0,
        delta_step_count: delta_step_count?.value ?? 0,
        rotation_matrix: rotation_matrix?.value ?? [],
        extra_attributes: attributes,
        capture_taken_at: new Date(timestamp * 1000).toISOString(),
      }),
      { device_identifier, planter_identifier },
    );
    log.log('/v1/tree done');
    res.status(200).json();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  rawCapturePost,
  LegacyTreePost,
};
