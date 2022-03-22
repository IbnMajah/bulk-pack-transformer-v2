const axios = require('axios').default;

const config = require('../../config/config');

const defaultImageUrl =
  'https://greenstand.org/fileadmin/02-graphics/12-externally-linked/no-planter-image.png';

const WalletRegistration = ({
  wallet,
  first_name,
  last_name,
  phone = null,
  email = null,
  lat,
  lon,
  id,
  user_photo_url = defaultImageUrl,
  v1_legacy_organization = null,
  registered_at = new Date().toISOString(),
}) =>
  Object.freeze({
    id,
    wallet,
    user_photo_url,
    first_name,
    last_name,
    phone,
    email,
    lat,
    lon,
    v1_legacy_organization,
    registered_at,
  });

const createWalletRegistration = async (walletRegistrationObject) => {
  const {
    wallet,
    user_photo_url,
    first_name,
    last_name,
    phone,
    email,
    registered_at,
    lat,
    lon,
  } = walletRegistrationObject;

  // put request to the treetracker api microservice
  const growerAccountObject = {
    wallet,
    first_name,
    last_name,
    email,
    phone,
    lat,
    lon,
    image_url: user_photo_url,
    first_registration_at: registered_at,
  };

  const response = await axios.put(
    `${config.treetrackerApiUrl}/grower_accounts`,
    growerAccountObject,
  );
  const grower_account_id = response.data.id;

  // post to the field-data microservice
  await axios.post(`${config.treetrackerFieldDataUrl}/wallet-registration`, {
    ...walletRegistrationObject,
    grower_account_id,
  });
};

module.exports = {
  createWalletRegistration,
  WalletRegistration,
};
