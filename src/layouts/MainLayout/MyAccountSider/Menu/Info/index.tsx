import Text from '@/components/Text';
import { useAccountInfo } from '@/utils/hooks/connect/wallet';
import React from 'react';
import styles from './index.less';
import QR from './QR';

interface Props {}

const Info: React.FC<Props> = (props: Props) => {
  const accountInfo = useAccountInfo();

  return (
    <div className={styles.info}>
      <Text type="headline-20-semi-bold" className={styles.username}>
        {accountInfo?.username}
      </Text>
      <Text
        type="caption-12-regular"
        color="primary-100"
        className={styles.email}
      >
        {accountInfo?.email}
      </Text>

      <QR />
    </div>
  );
};

export default Info;
