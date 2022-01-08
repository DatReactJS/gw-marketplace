import { checkCoin98Installed } from '@/utils/contracts/ultilities';

export const connectCoin98Service = async () => {
  const isCoin98Installed = checkCoin98Installed();
  if (!isCoin98Installed) {
    return Promise.reject({
      message: 'Coin98 extension is not installed!',
    });
  }
  const accounts = await window?.coin98?.provider.request({
    method: 'eth_accounts',
  });

  return accounts[0];
};
