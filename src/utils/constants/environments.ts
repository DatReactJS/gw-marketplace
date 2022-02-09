export const ENVIRONMENTS = {
  SKIP_PREFLIGHT_CHECK:
    `${process.env.APP__SKIP_PREFLIGHT_CHECK}` === 'true' ? true : false,

  CHAIN_URL: process.env.APP__CHAIN_URL || '',
  CHAIN_RPC_URL: process.env.APP__CHAIN_RPC_URL || '',
  CHAIN_ID: process.env.APP__CHAIN_ID || '',
  CHAIN_HASH_ID: process.env.APP__CHAIN_HASH_ID || '',
  CHAIN_NAME: process.env.APP__CHAIN_NAME || '',

  API_URL: process.env.APP__API_URL || '',
  API_META_URL: process.env.APP__API_META_URL || '',

  APP_URL: process.env.APP__APP_URL || '',
  LOCAL_STORAGE_KEY: process.env.APP__LOCAL_STORAGE_KEY || '',
};
