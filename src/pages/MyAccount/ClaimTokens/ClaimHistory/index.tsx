import Text from '@/components/Text';
import React from 'react';
import { history, useIntl } from 'umi';
import ElementClaimHistory from './ElementClaimHistory';
import styles from './index.less';

interface Props {}

const ClaimHistory: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  return (
    <div className={styles.containerHistory}>
      <div className={styles.header}>
        <Text type="headline-20-extra-bold">
          {intl.formatMessage({ id: 'claim.claimHistory' })}
        </Text>
      </div>
      <div className={styles.content}>
        <ElementClaimHistory />
      </div>
    </div>
  );
};

export default ClaimHistory;
