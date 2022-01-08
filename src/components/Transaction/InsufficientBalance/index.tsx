import Button from '@/components/Button';
import Text from '@/components/Text';
import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {
  onClose: () => void;
}

const InsufficicentBalance: React.FC<Props> = ({ onClose }: Props) => {
  const intl = useIntl();

  const handleClose = (event: React.MouseEvent) => {
    event.preventDefault();

    onClose();
  };

  return (
    <div className={styles.insufficicentBalance}>
      <Text type="p-18-semi-bold">Content Insufficicent Balance</Text>

      <Button
        className={classNames('p-30-semi-bold', styles.btn)}
        onClick={handleClose}
      >
        {intl.formatMessage({ id: 'common.close' })}
      </Button>
    </div>
  );
};

export default InsufficicentBalance;
