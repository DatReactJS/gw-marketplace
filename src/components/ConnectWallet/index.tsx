import { useWallet } from '@/utils/hooks/connect/wallet';
import React, { useState } from 'react';
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
  const [address, setAddress] = useState('');
  const [isConnectError, setIsConnectError] = React.useState<boolean>(false);
  const account = useAccount();
  const onConnectSuccess = (address: string, walletType: string) => {
    console.log(address);
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
      onError: (er) => {
        console.log('er', er);
      },
    },
  );

  const validateSignature = useRequest(
    async (address: any, message: string) => {
      const signData = await account.signMessage(message);
      const _rs = await api.post(API_PATHS.VALIDATE_SIGNATURE, {
        data: {
          ...signData,
          address: address,
          message: message,
        },
      });
      return _rs;
    },
    {
      manual: true,
      onSuccess: (r) => {
        console.log('r', r);
        onConnectSuccess(r.address, WALLET_TYPE.META_MASK);
      },
      onError: (er) => {
        console.log('er', er);
      },
    },
  );

  const connectMetamaskRequest = useRequest(connectMetaService, {
    manual: true,
    onSuccess: (address: string) => {
      setAddress(address);
      connectWithAddress.run(address);
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
