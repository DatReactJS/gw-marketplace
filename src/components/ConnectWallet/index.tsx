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

const ConnectWallet: React.FC = () => {
  const intl = useIntl();
  const { walletState, setWalletState } = useWallet();

  const [isConnectError, setIsConnectError] = React.useState<boolean>(false);

  const onConnectSuccess = (address: string, walletType: string) => {
    const formattedAddress = formatWalletAddress(address);
    localStorage.setItem(
      ENVIRONMENTS.LOCAL_STORAGE_KEY,
      JSON.stringify({
        walletType,
        address,
        formattedAddress,
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

  const connectMetamaskRequest = useRequest(connectMetaService, {
    manual: true,
    onSuccess: (address: string) => {
      onConnectSuccess(address, WALLET_TYPE.META_MASK);
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
