import { WALLET_TYPE } from '@/utils/constants/wallet';
import {
  checkCoin98Installed,
  checkMetaMaskInstalled,
} from '@/utils/contracts/ultilities';

export const downloadExtention = (typeWallet: string) => {
  switch (typeWallet) {
    case WALLET_TYPE.META_MASK:
      window.open('https://metamask.io/download', '_blank');
      break;
    case WALLET_TYPE.COIN_98:
      window.open('https://coin98.com/wallet', '_blank');
      break;
    default:
      break;
  }
};

export const connectMetaService = async () => {
  const isMetamaskInstalled = checkMetaMaskInstalled();
  if (!isMetamaskInstalled) {
    return Promise.reject({ message: 'Metamask is not installed!' });
  }

  const isCoin98Installed = checkCoin98Installed();
  if (isCoin98Installed) {
    return Promise.reject({
      message:
        'Coin98 extension is enabled, you cannot use both Metamask and Coin98 at once.',
    });
  }

  const accounts = await window.ethereum.send('eth_requestAccounts');
  return accounts.result[0];
};
