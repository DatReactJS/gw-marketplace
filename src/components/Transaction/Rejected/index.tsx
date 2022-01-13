import Button from '@/components/Button';
import Text from '@/components/Text';
import classNames from 'classnames';
import React from 'react';
import { history, useIntl } from 'umi';
import styles from './index.less';

interface Props {
  onClose: () => void;
}

const Rejected: React.FC<Props> = ({ onClose }: Props) => {
  const intl = useIntl();

  const goLogin = (event: React.MouseEvent) => {
    event.preventDefault();

    history.push('/login');
  };

  return (
    <div className={styles.rejected}>
      <img alt="" src="/assets/images/danger_big.svg" className={styles.icon} />

      <Text type="title-24-semi-bold">
        {intl.formatMessage({ id: 'common.error' })}
      </Text>

      <Text type="body-14-regular" color="primary-100">
        {intl.formatMessage({ id: 'common.somethingWrong' })}
      </Text>
      <Button className={styles.btn} onClick={goLogin}>
        {intl.formatMessage({ id: 'login.logIn' })}
      </Button>
    </div>
  );
};

export default Rejected;
