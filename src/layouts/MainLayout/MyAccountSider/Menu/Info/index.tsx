import Button from '@/components/Button';
import Text from '@/components/Text';
import React from 'react';
import styles from './index.less';
import QR from './QR';

interface Props {}

const Info: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.info}>
      <Text type="headline-20-semi-bold">Jack Richards</Text>
      <Text type="caption-12-regular" color="primary-100">
        jrichards123@gmail.com
      </Text>

      <QR />
    </div>
  );
};

export default Info;
