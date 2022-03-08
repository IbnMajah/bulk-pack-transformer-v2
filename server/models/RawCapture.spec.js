/* eslint-disable no-unused-expressions */
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { default: axios } = require('axios');
const convertStringToUuid = require('uuid-by-string');

chai.use(sinonChai);

const { expect } = chai;
const { RawCapture, createRawCapture } = require('./RawCapture');
const config = require('../../config/config');

describe('RawCapture Model', () => {
  it('RawCapture Models should return defined fields', () => {
    const rawCapture = RawCapture({});
    expect(rawCapture).to.have.keys([
      'id',
      'session_id',
      'image_url',
      'lat',
      'lon',
      'gps_accuracy',
      'note',
      'abs_step_count',
      'delta_step_count',
      'rotation_matrix',
      'extra_attributes',
      'captured_at',
    ]);
  });

  describe('should make a call to the rawCaptures external API endpoint', () => {
    const rawCaptureObject = {
      id: 'id',
      session_id: 'session_id',
      image_url: 'image_url',
      lat: 'lat',
      lon: 'lon',
      gps_accuracy: 'gps_accuracy',
      note: 'note',
      abs_step_count: 'abs_step_count',
      delta_step_count: 'delta_step_count',
      rotation_matrix: 'rotation_matrix',
      extra_attributes: 'extra_attributes',
      captured_at: 'captured_at',
    };

    const v1Details = {
      planter_identifier: 'planter_identifier',
      device_identifier: 'device_identifier',
    };

    let axiosStub;
    let fieldDataUrlStub;
    let axiosGetStub;

    beforeEach(() => {
      axiosStub = sinon.stub(axios, 'post');
      axiosGetStub = sinon.stub(axios, 'get');
      fieldDataUrlStub = sinon.stub(config, 'treetrackerFieldDataUrl');
      fieldDataUrlStub.get(() => 'treetrackerFieldDataUrl');
    });

    afterEach(() => {
      axiosStub.restore();
      axiosGetStub.restore();
      fieldDataUrlStub.restore();
    });

    it('should error out if walletRegistration is empty --v1', async () => {
      const { planter_identifier, device_identifier } = v1Details;
      axiosGetStub.callsFake((url) => {
        if (
          url.includes(
            `wallet-registration/${convertStringToUuid(
              device_identifier + planter_identifier,
            )}`,
          )
        ) {
          return { data: {} };
        }
        return { data: { something: 'exists' } };
      });
      try {
        await createRawCapture(rawCaptureObject, v1Details);
        expect(axiosStub).to.not.called;
        expect(axiosGetStub).to.be.calledTwice;
      } catch (e) {
        expect(axiosGetStub).to.be.calledTwice;
        expect(axiosStub).to.not.called;
        expect(e.message).to.contain(
          'The wallet registration information must have been inserted before the raw_capture can be created',
        );
        expect(e.code).to.eql(422);
      }
    });

    it('should error out if deviceConfiguration is empty --v1', async () => {
      axiosGetStub.callsFake((url) => {
        if (
          url.includes(
            `device-configuration/${convertStringToUuid(
              v1Details.device_identifier,
            )}`,
          )
        ) {
          return { data: {} };
        }
        return { data: { something: 'exists' } };
      });
      try {
        await createRawCapture(rawCaptureObject, v1Details);
        expect(axiosStub).to.not.called;
        expect(axiosGetStub).to.be.calledOnce;
      } catch (e) {
        expect(axiosGetStub).to.be.calledOnce;
        expect(axiosStub).to.not.called;
        expect(e.message).to.contain(
          'The device information must have been inserted before the raw_capture can be created',
        );
        expect(e.code).to.eql(422);
      }
    });

    it('should create a session before creating a rawCapture --v1', async () => {
      const { planter_identifier, device_identifier } = v1Details;
      const sessionId = convertStringToUuid(
        device_identifier + planter_identifier,
      );
      axiosGetStub.resolves({
        data: {
          something: 'exists',
          v1_legacy_organization: 'v1_legacy_organization',
        },
      });

      await createRawCapture(rawCaptureObject, v1Details);
      expect(axiosStub).to.be.calledTwice;
      expect(
        axiosStub.calledWith('treetrackerFieldDataUrl/session', {
          id: sessionId,
          device_configuration_id: convertStringToUuid(device_identifier),
          originating_wallet_registration_id: sessionId,
          organization: 'v1_legacy_organization',
        }) &&
          axiosStub.calledWith('treetrackerFieldDataUrl/raw-captures', {
            ...rawCaptureObject,
            session_id: sessionId,
          }),
      ).to.be.true;
      expect(axiosGetStub).to.be.calledTwice;
    });

    it('should create a rawCapture --v2', async () => {
      await createRawCapture(rawCaptureObject);
      expect(axiosGetStub).to.not.be.called;
      expect(axiosStub).to.be.calledOnce;
      expect(axiosStub).calledWith('treetrackerFieldDataUrl/raw-captures', {
        ...rawCaptureObject,
      });
    });
  });
});
