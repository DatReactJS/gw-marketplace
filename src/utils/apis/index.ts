import { extend } from 'umi-request';
import { ENVIRONMENTS } from '../constants/environments';
import ERROR_CODES from './error_code';

export const web = extend({
  prefix: ENVIRONMENTS.APP_URL,
});

export const api = extend({
  prefix: ENVIRONMENTS.API_URL,
  errorHandler: (res: any) => {
    if (res?.code && ERROR_CODES[res.code]) {
      throw ERROR_CODES[res.code];
    }
  },
});

export const apiMeta = extend({
  prefix: ENVIRONMENTS.API_META_URL,
  errorHandler: (res: any) => {
    if (res?.data?.code && ERROR_CODES[res?.data?.code]) {
      throw ERROR_CODES[res?.data?.code];
    }
  },
});

// WEB
export const WEB_PATHS = {
  APP_CONFIG: '/assets/configs/appConfig.json',
};

export const API_PATHS = {};
