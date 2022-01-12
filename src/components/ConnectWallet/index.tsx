import { useWallet } from '@/utils/hooks/connect/wallet';
import React from 'react';
import Button from '../Button';
import styles from './index.less';
import ConnectError from './ConnectError';
import { useRequest } from '@umijs/hooks';
import { connectMetaService } from '@/utils/hooks/connect/metamask';
import { formatWalletAddress } from '@/utils/normalizers';
import { WALLET_TYPE } from '@/utils/constants/wallet';
import { ENVIRONMENTS } from '@/utils/constants/environments';
import { useIntl } from 'umi';
import { api, API_PATHS } from '@/utils/apis';
import useAccount from '@/utils/contracts/account';

const ConnectWallet: React.FC = () => {
  const intl = useIntl();
  const { walletState, setWalletState } = useWallet();
  const account = useAccount();

  const [address, setAddress] = React.useState<string>('');
  const [isConnectError, setIsConnectError] = React.useState<boolean>(false);

  const onConnectSuccess = (
    { address, token }: { address: string; token: string },
    walletType: string,
  ) => {
    const formattedAddress = formatWalletAddress(address);
    localStorage.setItem(
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
  };

  const connectWithAddress = useRequest(
    (addressWallet: string) => {
      return api.post(API_PATHS.LOGIN_WITH_ADDRESS, {
        data: {
          address: addressWallet,
        },
      });
    },
    {
      manual: true,
      onSuccess: (r) => {
        validateSignature.run(address, r.message);
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
        onConnectSuccess(
          { address: r?.address, token: r?.token },
          WALLET_TYPE.META_MASK,
        );
      },
    },
  );

  const connectMetamaskRequest = useRequest(connectMetaService, {
    manual: true,
    onSuccess: (r: string) => {
      setAddress(r);
      connectWithAddress.run(r);
    },
    onError: (error: any) => {
      console.log('🚀 ~ error', error);
      if (error.code !== -32002) {
        setIsConnectError(true);
      }
    },
  });

  const handleConnectMetamask = () => {
    setWalletState({
      ...walletState,
      // @ts-ignore
      walletType: WALLET_TYPE.META_MASK,
    });
    connectMetamaskRequest.run();
  };

  const handleCloseError = () => {
    setIsConnectError(false);
  };

  return (
    <div className={styles.connectWallet}>
      <Button
        className={styles.btnConnect}
        icon={<img alt="" src="/assets/images/metamask.png" />}
        onClick={handleConnectMetamask}
      >
        {intl.formatMessage({ id: 'login.withMetamask' })}
      </Button>

      <ConnectError
        visible={isConnectError}
        onClose={handleCloseError}
        connectType={WALLET_TYPE.META_MASK}
      />
    </div>
  );
};

export default ConnectWallet;
