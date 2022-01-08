import Button from '@/components/Button';
import Text from '@/components/Text';
import React from 'react';
import styles from './index.less';

interface Props {}

const InfoQR: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.infoQr}>
      <Text type="headline-20-semi-bold">Jack Richards</Text>
      <Text type="caption-12-regular" color="primary-100">
        jrichards123@gmail.com
      </Text>

      <Button
        type="outline"
        className={styles.btnShow}
        icon={<img alt="" src="/assets/images/qr.svg" />}
      >
        Show QR
      </Button>
    </div>
  );
};

export default InfoQR;
