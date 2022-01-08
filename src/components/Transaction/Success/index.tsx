import Button from '@/components/Button';
import Text from '@/components/Text';
import React from 'react';
import { history, useIntl } from 'umi';
import styles from './index.less';

interface Props {
  hash: string;
}

const Success: React.FC<Props> = ({ hash }: Props) => {
  const intl = useIntl();

  const goInventory = (event: React.MouseEvent) => {
    event.preventDefault();

    history.push('/account/inventory');
  };

  return (
    <div className={styles.success}>
      <img
        alt=""
        src="/assets/images/success_big.svg"
        className={styles.icon}
      />

      <Text type="title-24-semi-bold">
        {intl.formatMessage({ id: 'common.purchaseSuccessful' })}
      </Text>

      <Text type="body-14-regular" color="primary-100">
        {intl.formatMessage({ id: 'common.description' })}
      </Text>

      <Button className={styles.btn} onClick={goInventory}>
        {intl.formatMessage({ id: 'common.goInventory' })}
      </Button>
    </div>
  );
};

export default Success;
