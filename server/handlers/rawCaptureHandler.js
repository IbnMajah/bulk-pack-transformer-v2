const log = require('loglevel');

const { createRawCapture, RawCapture } = require('../models/RawCapture');

const rawCapturePost = async function (req, res, next) {
  log.log('/captures');
  try {
    const { body } = req;
    delete body.extra_attributes;
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
      key,
    } = req.body;

    const { attributes } = req.body;

    const absStepCountIndex = attributes.findIndex(
      (a) => a.key === 'abs_step_count',
    );
    let abs_step_count;

    if (absStepCountIndex !== -1) {
      const absStepCountArray = attributes.splice(absStepCountIndex, 1);
      [abs_step_count] = absStepCountArray;
    }

    const deltaStepCountIndex = attributes.findIndex(
      (a) => a.key === 'delta_step_count',
    );
    let delta_step_count;

    if (deltaStepCountIndex !== -1) {
      const deltaStepCountArray = attributes.splice(deltaStepCountIndex, 1);
      [delta_step_count] = deltaStepCountArray;
    }

    const rotationMatrixIndex = attributes.findIndex(
      (a) => a.key === 'rotation_matrix',
    );
    let rotation_matrix;

    if (rotationMatrixIndex !== -1) {
      const rotationMatrixArray = attributes.splice(rotationMatrixIndex, 1);
      [rotation_matrix] = rotationMatrixArray;
    }

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
        captured_at: new Date(timestamp * 1000).toISOString(),
        key,
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
