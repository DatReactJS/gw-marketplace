import { api, API_PATHS, privateRequest } from '@/utils/apis';
import { useRequest } from '@umijs/hooks';
import { useRecoilState } from 'recoil';
import { useIsConnected, walletAtom } from '../connect/wallet';

export const updateInfo = (info: Record<string, any>) => {
  const [walletState, setWalletState] = useRecoilState(walletAtom);

  if (info) {
    setWalletState({
      ...walletState,
      userInfo: {
        ...walletState.userInfo,
        ...info,
      },
    });
  }
};

export const useAccountInfoRequest = () => {
  const [walletState, setWalletState] = useRecoilState(walletAtom);
  const isConnected: boolean = useIsConnected();

  return useRequest(
    async () => {
      if (isConnected) {
        const info = await privateRequest(api.get, API_PATHS.INFO);
        // console.log('🚀 ~ info', info);

        return info;
      }

      return null;
    },
    {
      onSuccess: (r) => {
        if (r) {
          setWalletState({
            ...walletState,
            userInfo: r,
          });
        }
      },
      refreshDeps: [walletState.walletInfo.address],
    },
  );
};
