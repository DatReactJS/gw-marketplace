import { useEffect } from 'react';
import { useMount, useRequest } from '@umijs/hooks';
import { useWallet } from './wallet';
import { atom, useRecoilState } from 'recoil';
import { ENVIRONMENTS } from '@/utils/constants/environments';
import { api, API_PATHS } from '@/utils/apis';
import useAccount from '@/utils/contracts/account';
import { formatWalletAddress } from '@/utils/normalizers';

export const useProvider = () => {
  const { disconnectWallet, walletState, setWalletState } = useWallet();
  const account = useAccount();

  const walletType = walletState?.walletType;

  useMount(async () => {
    if (walletState.cacheInfo) {
      if (!walletState?.cacheInfo?.walletType) {
        disconnectWallet();
      }

      if (window?.ethereum) {
        const result = await window.ethereum.send('eth_requestAccounts');
        if (
          result?.result?.[0].toLowerCase?.() ===
          walletState?.cacheInfo?.address.toLowerCase()
        ) {
          return setWalletState({
            ...walletState,
            walletType: walletState.cacheInfo.walletType,
          });
        }
        return disconnectWallet();
      }

      return disconnectWallet();
    }
  });

  const connectWithAddress = useRequest(
    async (addressWallet: string) => {
      const login = await api.post(API_PATHS.LOGIN_WITH_ADDRESS, {
        data: {
          address: addressWallet,
        },
      });

      return {
        ...login,
        address: addressWallet,
      };
    },
    {
      manual: true,
      onSuccess: (r) => {
        validateSignature.run(r.address, r.message);
      },
    },
  );

  const validateSignature = useRequest(
    async (address: any, message: string) => {
      const signData = await account.signMessage(message);
      const _rs = await api.post(API_PATHS.VALIDATE_SIGNATURE, {
        data: {
          ...signData,
          address,
          message,
        },
      });
      return _rs;
    },
    {
      manual: true,
      onSuccess: (r) => {
        if (r) {
          const address: string = r?.address;
          const token: string = r?.token;
          const formattedAddress = formatWalletAddress(address);
          window?.localStorage.setItem(
            ENVIRONMENTS.LOCAL_STORAGE_KEY,
            JSON.stringify({
              walletType,
              address,
              formattedAddress,
              token,
            }),
          );
          setWalletState({
            ...walletState,
            // @ts-ignore
            walletType,
            // @ts-ignore
            walletInfo: { address, formattedAddress },
          });
        }
      },
    },
  );

  useEffect(() => {
    if (window?.ethereum) {
      window?.ethereum.on('accountsChanged', (accounts: any) => {
        connectWithAddress.run(accounts[0]);
      });
      window?.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
      window?.ethereum.on('disconnect', () => {
        disconnectWallet();
      });
    } else if (!window?.ethereum) {
      disconnectWallet();
    }
  }, [walletType]);
};

/**
 * Global state handle visible modal connect wallet
 */
const modalConnectWalletAtom = atom({
  key: `${ENVIRONMENTS.LOCAL_STORAGE_KEY}_CONNECT_WALLET`,
  default: {
    isVisible: false,
  },
});

export const useModalConnectWallet = () => {
  const [modalConnectWallet, setModalConnectWallet] = useRecoilState(
    modalConnectWalletAtom,
  );

  const onVisibleConnectWallet = () => {
    setModalConnectWallet({
      ...modalConnectWallet,
      isVisible: true,
    });
  };

  const onCloseConnectWallet = () => {
    setModalConnectWallet({
      ...modalConnectWallet,
      isVisible: false,
    });
  };

  return {
    isVisibleConnectWallet: modalConnectWallet.isVisible,
    onVisibleConnectWallet,
    onCloseConnectWallet,
  };
};
