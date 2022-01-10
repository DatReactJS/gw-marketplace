import Loading from '@/components/Loading';
import Text from '@/components/Text';
import { useRequest } from '@umijs/hooks';
import React from 'react';
import { useIntl } from 'umi';
import Email from './Email';
import styles from './index.less';
import Name from './Name';
import Password from './Password';

interface Props {}

const Settings: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  const { loading, data, refresh } = useRequest(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 500);
    });
  });

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }

    if (data && !loading) {
      return (
        <>
          <Name name="David" />
          <Email email="david@gmail.com" />
          <Password />
        </>
      );
    }

    /**
     * TODO: Return error page or null
     */

    return null;
  };

  return (
    <div className={styles.settings}>
      <Text type="title-24-semi-bold" color="primary-100">
        {intl.formatMessage({ id: 'settings.gereral' })}
      </Text>

      {renderContent()}
    </div>
  );
};

export default Settings;
