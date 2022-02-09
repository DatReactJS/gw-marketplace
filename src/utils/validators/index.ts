import { toNumber } from 'lodash';

export const priceListingValidation = () => {
  return {
    validator: async (rule: any, value: number | string) => {
      if (!`${value}`) {
        throw new Error('Price is required!');
      }

      if (toNumber(value) < 0.001) {
        throw new Error('Min value is 0.001');
      }

      if (!toNumber(value)) {
        throw new Error('Value must be numbers, use "." instead "," ');
      }

      return Promise.resolve();
    },
  };
};
