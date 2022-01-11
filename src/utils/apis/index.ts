import { extend } from 'umi-request';
import { ENVIRONMENTS } from '../constants/environments';
import ERROR_CODES from './error_code';

// Local
export const web = extend({
  prefix: ENVIRONMENTS.APP_URL,
});

export const WEB_PATHS = {
  APP_CONFIG: '/assets/configs/appConfig.json',
};

// Swagger
export const api = extend({
  prefix: ENVIRONMENTS.API_URL,
  errorHandler: (res: any) => {
    if (res?.code && ERROR_CODES[res.code]) {
      throw ERROR_CODES[res.code];
    }
  },
});

export const API_PATHS = {
  // Login
  LOGIN: '/Login',
  LOGIN_WITH_ADDRESS: '/LoginWithAddress',
  VALIDATE_SIGNATURE: '/ValidateSignature',

  // Claim Reward
  CLAIM_REWARD: ({ token, amount }: { token: string; amount: number }) =>
    `ClaimReward?Token=${token}&Amount=${amount}`,

  // Account
  INFO: '/Info',
  INIT: '/Init',
  CHECK_USERNAME: '/CheckUsername',
  UPDATE_USERNAME: '/UpdateUsername',
  CHECK_EMAIL: '/CheckEmail',
  UPDATE_EMAIL: '/UpdateEmail',
  UPDATE_PASSWORD: '/UpdatePassword',
  RESEND_CONFIRMATION_EMAIL: '/ResendConfirmationEmail',
};

// Game
export const apiMeta = extend({
  prefix: ENVIRONMENTS.API_META_URL,
  errorHandler: (res: any) => {
    if (res?.data?.code && ERROR_CODES[res?.data?.code]) {
      throw ERROR_CODES[res?.data?.code];
    }
  },
});
