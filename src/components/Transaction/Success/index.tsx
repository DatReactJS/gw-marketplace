import Button from '@/components/Button';
import Text from '@/components/Text';
import React from 'react';
import { history, useIntl, useLocation } from 'umi';
import styles from './index.less';

interface Props {
  hash: string;
}

const Success: React.FC<Props> = ({ hash }: Props) => {
  const intl = useIntl();
  const location: any = useLocation();

  const goInventory = (event: React.MouseEvent) => {
    event.preventDefault();

    const [, path] = location.pathname.split('/');

    history.push(`/account/inventory?tab=${path}`);
  };

  const onViewTransaction = () => {
    window.open(`${process.env.APP__CHAIN_URL}tx/${hash}`, '_blank');
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
        {intl.formatMessage({ id: 'common.checkTransactionID' })}
      </Text>

      <div className={styles.transactionID} onClick={onViewTransaction}>
        <Text type="caption-12-semi-bold">
          0x9nq30x2609nt0x9nq30789548696x2609nt085
        </Text>
        <img alt="" src="/assets/images/ic-open-link.png" />
      </div>

      <Button className={styles.btn} onClick={goInventory}>
        {intl.formatMessage({ id: 'common.goInventory' })}
      </Button>
    </div>
  );
};

export default Success;
