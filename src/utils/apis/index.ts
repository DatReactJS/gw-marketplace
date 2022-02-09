import { extend } from 'umi-request';
import { ENVIRONMENTS } from '../constants/environments';
import { LocalInfo, LocalInfoObject } from '../contracts/ultilities';
import TokenManagement from '../TokenManagement';
import ERROR_CODES from './error_code';

// Local
export const web = extend({
  prefix: ENVIRONMENTS.APP_URL,
});

export const WEB_PATHS = {
  APP_CONFIG: '/assets/configs/appConfig.json',
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

/**
 * Swagger https://api.kingdomquest.io/swagger/index.html
 */

export const api = extend({
  prefix: ENVIRONMENTS.API_URL,
  errorHandler: (error: any) => {
    console.log(
      '🚀 ~ error',
      error,
      error?.code,
      error?.message,
      error?.response,
    );
    if (error?.message?.match('Failed to fetch')) {
      window?.localStorage.clear();
      return window?.location.reload();
    }

    if (error?.code && ERROR_CODES[error.code]) {
      throw ERROR_CODES[error.code];
    }
  },
});

api.interceptors.response.use(
  async (response) => {
    const data = await response.clone().json();
    if (!response.ok) {
      console.error(data);

      return data;
    }

    return response;
  },
  { global: false },
);

export const injectBearer = (token: string, configs: any) => {
  if (!configs) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  if (configs.headers) {
    return {
      ...configs,
      headers: {
        ...configs.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return {
    ...configs,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const TokenManager = new TokenManagement({
  isTokenValid: () => true,
  getAccessToken: () => {
    const localInfo: LocalInfo = window?.localStorage.getItem(
      ENVIRONMENTS.LOCAL_STORAGE_KEY,
    );
    let localInfoObject: LocalInfoObject;

    if (localInfo) {
      localInfoObject = JSON.parse(localInfo);
    }

    return localInfoObject?.token || '';
  },
});

export const privateRequest = async (
  request: any,
  url: string,
  configs?: any,
) => {
  const token: string = (await TokenManager.getToken()) as string;
  return request(url, injectBearer(token, configs));
};

export const API_PATHS = {
  // Login
  LOGIN: '/Login',
  LOGIN_WITH_ADDRESS: '/LoginWithAddress',
  VALIDATE_SIGNATURE: '/ValidateSignature',

  // Claim Reward
  CLAIM_REWARD: ({ token, amount }: { token: string; amount: number }) =>
    `ClaimReward?Token=${token}&Amount=${amount}`,

  // Account
  INFO: '/Account/Info',
  INIT: '/Account/Init',
  CHECK_USERNAME: '/Account/CheckUsername',
  UPDATE_USERNAME: '/Account/UpdateUsername',
  CHECK_EMAIL: '/Account/CheckEmail',
  UPDATE_EMAIL: '/Account/UpdateEmail',
  UPDATE_PASSWORD: '/Account/UpdatePassword',
  RESEND_CONFIRMATION_EMAIL: '/Account/ResendConfirmationEmail',
};
