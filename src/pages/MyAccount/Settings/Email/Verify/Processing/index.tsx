import Button from '@/components/Button';
import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {
  onConfirm: () => void;
  loading: boolean;
}

const Processing: React.FC<Props> = ({ onConfirm, loading }: Props) => {
  const intl = useIntl();

  const onClickConfirm = (event: React.MouseEvent) => {
    event.preventDefault();

    onConfirm();
  };

  return (
    <div className={styles.processing}>
      <img alt="" src="/assets/images/infor_big.svg" className={styles.icon} />

      <Text type="title-24-semi-bold">
        {intl.formatMessage({ id: 'settings.verifyEmailAddress' })}
      </Text>

      <Text
        type="body-14-regular"
        color="primary-100"
        className={styles.description}
      >
        {intl.formatMessage({ id: 'settings.verifyEmailAddressDesc' })}
      </Text>

      <Button
        className={styles.btnConfirm}
        onClick={onClickConfirm}
        loading={loading}
      >
        {intl.formatMessage({ id: 'common.confirm' })}
      </Button>
    </div>
  );
};

export default Processing;
