import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {}

const NoData: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  return (
    <div className={styles.noData}>
      <img alt="" src="/assets/images/no-data.png" />

      <div className={styles.description}>
        <Text type="headline-20-semi-bold">
          {intl.formatMessage({ id: 'marketplace.noResultFound' })}
        </Text>
        <Text type="body-16-semi-bold">
          {intl.formatMessage({ id: 'marketplace.cantMatch' })}
        </Text>
      </div>
    </div>
  );
};

export default NoData;
