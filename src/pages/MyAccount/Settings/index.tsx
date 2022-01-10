import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import Email from './Email';
import styles from './index.less';
import Name from './Name';

interface Props {}

const Settings: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  return (
    <div className={styles.settings}>
      <Text type="title-24-semi-bold" color="primary-100">
        {intl.formatMessage({ id: 'settings.gereral' })}
      </Text>

      <Name />
      <Email />
    </div>
  );
};

export default Settings;
