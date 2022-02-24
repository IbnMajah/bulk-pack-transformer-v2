const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { default: axios } = require('axios');

chai.use(sinonChai);

const { expect } = chai;
const {
  WalletRegistration,
  createWalletRegistration,
} = require('./WalletRegistration');
const config = require('../../config/config');

describe('WalletRegistration Model', () => {
  it('WalletRegistration Models should return defined fields', () => {
    const walletRegistration = WalletRegistration({});
    expect(walletRegistration).to.have.keys([
      'id',
      'wallet',
      'user_photo_url',
      'first_name',
      'last_name',
      'phone',
      'email',
      'lat',
      'lon',
      'v1_legacy_organization',
      'registered_at',
    ]);
  });

  it('should make a call to the walletRegistration external API endpoint', async () => {
    const walletRegistrationObject = {
      id: 'id',
      wallet: 'wallet',
      user_photo_url: 'user_photo_url',
      first_name: 'first_name',
      last_name: 'last_name',
      phone: 'phone',
      email: 'email',
      lat: 'lat',
      lon: 'lon',
      v1_legacy_organization: 'v1_legacy_organization',
      registered_at: 'registered_at',
    };

    const axiosStub = sinon.stub(axios, 'post');
    const axiosPutStub = sinon.stub(axios, 'put');
    const fieldDataUrlStub = sinon.stub(config, 'treetrackerFieldDataUrl');
    const treetrackerServiceUrl = sinon.stub(config, 'treetrackerApiUrl');

    fieldDataUrlStub.get(() => 'fieldDataUrl');
    treetrackerServiceUrl.get(() => 'treetrackerApiUrl');
    axiosPutStub.resolves({ data: { id: 'growerAccountId' } });
    await createWalletRegistration(walletRegistrationObject);
    expect(axiosPutStub).calledWith('treetrackerApiUrl/grower_accounts', {
      wallet: 'wallet',
      first_name: 'first_name',
      last_name: 'last_name',
      email: 'email',
      phone: 'phone',
      image_url: 'user_photo_url',
      first_registration_at: 'registered_at',
      lat: 'lat',
      lon: 'lon',
    });
    expect(axiosStub).calledWith('fieldDataUrl/wallet-registration', {
      ...walletRegistrationObject,
      grower_account_id: 'growerAccountId',
    });
    axiosStub.restore();
    axiosPutStub.restore();
    fieldDataUrlStub.restore();
  });
});
