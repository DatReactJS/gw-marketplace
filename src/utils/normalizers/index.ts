import { toNumber, toLower, cloneDeep } from 'lodash';
import numeral from 'numeral';
import { BigNumber, ethers } from 'ethers';

export const isOwned = (myAddress: string, nftOwnedIdAddress: string) =>
  toLower(myAddress) === toLower(nftOwnedIdAddress);

export const formatWalletAddress = (address: string, toNumber = 4) => {
  const _stringDel = address.substring(6, address.length - toNumber);
  return address.replace(_stringDel, '...');
};

export const getRandomMessage = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

export const formatBNBToUSD = (
  price: string | number,
  bnbPrice?: string | number,
  format?: string,
) => {
  if (!price || !bnbPrice) {
    return '';
  }
  const toUsd = toNumber(price) * toNumber(bnbPrice);
  if (!toUsd) {
    return '';
  }

  if (format) {
    return numeral(toUsd).format(format);
  }

  return `${numeral(toUsd).format('0.0')} $`;
};

export const normalizeIntNumber = (value = '', max: string | number) => {
  if (!value?.trim() && value !== '0') {
    return '';
  }

  const newValue = toNumber(cloneDeep(value).replace(/[^0-9]/g, ''));
  if (max && newValue > toNumber(max)) return max;
  return newValue;
};

export const normalizeInputPrice = (value: string): string => {
  if (!value) return '';

  if (value.charAt(0) === '.') {
    const [, newValue]: string[] = value.split('.');

    return `0.${newValue}`;
  }

  if (value.includes('.')) {
    return value;
  }

  const number: number = +value;

  return number.toString();
};

export const normalizeInputAmount = (
  value: string,
  maxAmount = 999999999,
): string => {
  const toNumber: number = +value;
  if (!value || toNumber < 1) return '1';

  if (toNumber > maxAmount) return maxAmount.toString();

  return toNumber.toString();
};

export const getPriceBaseWhiteList = ({
  amount,
  isWhiteList = false,
  basePrice,
}: {
  amount: number;
  isWhiteList: boolean;
  basePrice: BigNumber;
}) => {
  if (isWhiteList && amount) {
    if (amount > 8000 && amount <= 10000) {
      return basePrice.mul(80).div(100).mul(amount);
    }
    if (amount > 4000 && amount <= 8000) {
      return basePrice.mul(85).div(100).mul(amount);
    }
    if (amount > 1000 && amount <= 4000) {
      return basePrice.mul(90).div(100).mul(amount);
    }
    return basePrice.mul(amount);
  }
  return basePrice.mul(amount);
};

export const walletAddressLink = (address: string) => {
  window?.open(`${process.env.APP__CHAIN_URL}/address/${address}`, '_blank');
  return;
};
