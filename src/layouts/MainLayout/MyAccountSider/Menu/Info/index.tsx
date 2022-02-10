import Text from '@/components/Text';
import { useAccountInfoRequest } from '@/utils/hooks/account';
import { useAccountInfo } from '@/utils/hooks/connect/wallet';
import React from 'react';
import styles from './index.less';
import QR from './QR';

interface Props {}

const Info: React.FC<Props> = (props: Props) => {
  useAccountInfoRequest();
  const accountInfo = useAccountInfo();

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

      <QR />
    </div>
  );
};

export default Info;
