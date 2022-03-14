import Text from '@/components/Text';
import { useAccountInfoRequest } from '@/utils/hooks/account';
import { useAccountInfo, useWalletInfo } from '@/utils/hooks/connect/wallet';
import { formatWalletAddress } from '@/utils/normalizers';
import React from 'react';
import styles from './index.less';
import QR from './QR';

interface Props {}

const Info: React.FC<Props> = (props: Props) => {
  useAccountInfoRequest();
  const accountInfo = useAccountInfo();
  const walletInfo = useWalletInfo();
  return (
    <div className={styles.info}>
      <Text type="headline-20-semi-bold" className={styles.username}>
        {accountInfo?.username || 'Unknown user'}
      </Text>
      <Text
        type="caption-12-regular"
        color="primary-100"
        className={styles.email}
      >
        {accountInfo?.email || 'Unknown'}
      </Text>
      <div className={styles.menuMobile}>
        <QR />
        <div className={styles.wallet}>
          <img alt="" src="/assets/images/metamask.png" />
          <div className={styles.detail}>
            <Text type="caption-12-semi-bold">
              {Math.abs(walletInfo?.balance || 0)} KGC
            </Text>
            <Text type="caption-12-regular" color="primary-100">
              {formatWalletAddress(walletInfo?.address, 8)}
            </Text>
          </div>
        </div>
      </div>
      <div className={styles.contentQr}>
        <QR />
      </div>
    </div>
  );
};

export default Info;
