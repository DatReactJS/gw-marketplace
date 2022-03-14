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

/**
 * Swagger https://api.kingdomquest.io/swagger/index.html
 */

export const api = extend({
  prefix: ENVIRONMENTS.API_URL,
  errorHandler: (error: any) => {
    console.log(
      '🚀 ~ error with API',
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
    if (!response.ok) {
      const data = await response.clone().json();
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
  SEND_RESET_PASSWORD_EMAIL: (email: string) =>
    `/SendResetPasswordEmail?email=${email}`,
  UPDATE_PASSWORD_BY_TOKEN: '/UpdatePasswordByToken',

  // Claim Reward
  CLAIM_REWARD: ({
    token,
    amount,
    player,
  }: {
    token: string;
    amount: number;
    player: string;
  }) => `ClaimReward?Player=${player}&Token=${token}&Amount=${amount}`,

  // Account
  INFO: '/Account/Info',
  INIT: '/Account/Init',
  CHECK_USERNAME: '/Account/CheckUsername',
  UPDATE_USERNAME: '/Account/UpdateUsername',
  CHECK_EMAIL: '/Account/CheckEmail',
  UPDATE_EMAIL: '/Account/UpdateEmail',
  UPDATE_PASSWORD: '/Account/UpdatePassword',
  RESEND_CONFIRMATION_EMAIL: '/Account/ResendConfirmationEmail',
  ACTIVITIES: (time?: { from: string; to: string }) => {
    if (time) {
      return `/Account/Activity?from=${time.from}&to=${time.to}`;
    }

    return '/Account/Activity';
  },
  SIGN_WITHDRAW_TOKEN: (amount: string) =>
    `/Account/WithdrawToken?amount=${amount}`,
  SIGN_CANCEL_WITHDRAW: (ticketId: string) =>
    `/Account/CancelWithdraw?ticketId=${ticketId}`,
  SIGN_CLAIM_REWARD: (token: string, amount: number) =>
    `/Account/ClaimReward?token=${token}&amount=${amount}`,
  SIGN_CANCEL_CLAIM_REWARD: (ticketId: string) =>
    `/Account/CancelClaimReward?ticketId=${ticketId}`,

  // Email Link
  CONFIRM_EMAIL: (token: string) => `/ConfirmEmail?token=${token}`,
  RESET_PASSWORD_BY_EMAIL: (token: string) =>
    `/ResetPasswordByEmail?token=${token}`,

  // Config
  TOKEN_LIST: '/Config/TokenList',
  CONTRACT_LIST: '/Config/ContractList',
  GET_TOKEN: (symbol: string) => `/Config/GetToken?symbol=${symbol}`,

  // QRCoder
  LOGIN_QR_CODE: '/QrCoder/Login',

  // NFT Info
  NFT_INFO: (id: string) => `/api/NftInfo/${id}`,

  // Marketplace
  SELL_ITEM: '/Marketplace/SellItem',
  CANCEL_ORDER: (orderId: string) =>
    `/Marketplace/CancelOrder?orderId=${orderId}`,
};
