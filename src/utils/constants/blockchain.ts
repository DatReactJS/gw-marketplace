import { ENVIRONMENTS } from '@/utils/constants/environments';

const BLOCKCHAIN_NET = {
  chainName: ENVIRONMENTS.CHAIN_NAME,
  rpcUrls: [ENVIRONMENTS.CHAIN_RPC_URL],
  chainId: ENVIRONMENTS.CHAIN_HASH_ID,
  nativeCurrency: {
    symbol: 'BNB',
    decimals: 18,
  },
  blockExplorerUrls: [ENVIRONMENTS.CHAIN_URL],
};

export const CURRENT_NET = BLOCKCHAIN_NET;
