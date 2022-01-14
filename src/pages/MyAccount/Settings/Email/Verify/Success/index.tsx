import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {}

const Success: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  return (
    <div className={styles.success}>
      <img
        alt=""
        src="/assets/images/success_big.svg"
        className={styles.icon}
      />

      <Text type="title-24-semi-bold">
        {intl.formatMessage({ id: 'settings.verifySuccess' })}
      </Text>

      <Text type="body-14-regular" color="primary-100">
        {intl.formatMessage({ id: 'settings.verifyDescription' })}
      </Text>
    </div>
  );
};

export default Success;
