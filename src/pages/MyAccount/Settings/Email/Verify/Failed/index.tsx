import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {}

const Failed: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  return (
    <div className={styles.failed}>
      <img alt="" src="/assets/images/danger_big.svg" className={styles.icon} />

      <Text type="title-24-semi-bold">
        {intl.formatMessage({ id: 'common.error' })}
      </Text>

      <Text type="body-14-regular" color="primary-100">
        {intl.formatMessage({ id: 'settings.verifyError' })}
      </Text>
    </div>
  );
};

export default Failed;
