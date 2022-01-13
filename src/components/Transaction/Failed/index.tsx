import Button from '@/components/Button';
import Text from '@/components/Text';
import React from 'react';
import { history, useIntl } from 'umi';
import { StatusError } from '..';
import styles from './index.less';

interface Props {
  error?: StatusError;
  onClose: () => void;
}

const Failed: React.FC<Props> = ({ error, onClose }: Props) => {
  const intl = useIntl();

  const goLogin = (event: React.MouseEvent) => {
    event.preventDefault();

    history.push('/login');
  };

  const goAccount = (event: React.MouseEvent) => {
    event.preventDefault();

    history.push('/account');
  };

  return (
    <div className={styles.failed}>
      <img alt="" src="/assets/images/danger_big.svg" className={styles.icon} />

      <Text type="title-24-semi-bold">
        {intl.formatMessage({ id: 'common.purchaseFailed' })}
      </Text>

      {error === StatusError.AUTHENTICATED && (
        <>
          <Text type="body-14-regular" color="primary-100">
            {intl.formatMessage({ id: 'common.connectError' })}
          </Text>
          <Button className={styles.btn} onClick={goLogin}>
            {intl.formatMessage({ id: 'login.logIn' })}
          </Button>
        </>
      )}

      {error === StatusError.INSUFFICIENT_BALANCE && (
        <>
          <Text type="body-14-regular" color="primary-100">
            {intl.formatMessage({ id: 'common.funds' })}
          </Text>
          <Button className={styles.btnClose} onClick={onClose}>
            {intl.formatMessage({ id: 'common.close' })}
          </Button>
        </>
      )}
    </div>
  );
};

export default Failed;
