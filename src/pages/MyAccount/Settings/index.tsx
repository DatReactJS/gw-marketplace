import Loading from '@/components/Loading';
import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import Email from './Email';
import styles from './index.less';
import Username from './Username';
import Password from './Password';
import { useAccountInfoRequest } from '@/utils/hooks/account';
import Init from './Init';

interface Props {}

const Settings: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  const { loading, data, refresh } = useAccountInfoRequest();

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }

    if (data && !loading) {
      return (
        <>
          {data?.username ? (
            <>
              <Username username={data.username} />
              <Password />
              <Email
                email={data.email || ''}
                isVerified={!!(data.isVerified && data?.email)}
                refresh={refresh}
              />
            </>
          ) : (
            <Init refresh={refresh} />
          )}
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
