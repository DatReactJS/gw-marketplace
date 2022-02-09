import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {
  hash: string;
}

const Processing: React.FC<Props> = ({ hash }: Props) => {
  const intl = useIntl();

  const onViewTransaction = () => {
    window?.open(`${process.env.APP__CHAIN_URL}tx/${hash}`, '_blank');
  };

  return (
    <div className={styles.processing}>
      <img
        alt=""
        src="/assets/images/ic-loader.png"
        className={styles.loader}
      />

      <Text type="body-14-regular" color="primary-100">
        {intl.formatMessage({ id: 'common.checkTransactionID' })}
      </Text>

      <div className={styles.transactionID} onClick={onViewTransaction}>
        <Text type="caption-12-semi-bold">
          0x9nq30x2609nt0x9nq30789548696x2609nt085
        </Text>
        <img alt="" src="/assets/images/ic-open-link.png" />
      </div>
    </div>
  );
};

export default Processing;
