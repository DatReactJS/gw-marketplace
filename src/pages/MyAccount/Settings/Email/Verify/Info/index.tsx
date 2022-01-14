import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {
  email: string;
}

const Info: React.FC<Props> = ({ email }: Props) => {
  const intl = useIntl();

  return (
    <div className={styles.info}>
      <img alt="" src="/assets/images/infor_big.svg" className={styles.icon} />

      <Text type="title-24-semi-bold">
        {intl.formatMessage({ id: 'settings.verifyEmail' })}
      </Text>

      <Text
        type="body-14-regular"
        color="primary-100"
        className={styles.description}
      >
        {intl.formatMessage(
          { id: 'settings.verifyEmailDescription' },
          { email },
        )}
      </Text>
    </div>
  );
};

export default Info;
