import Button from '@/components/Button';
import Text from '@/components/Text';
import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {
  hash: string;
  onClose: () => void;
}

const Success: React.FC<Props> = ({ hash, onClose }: Props) => {
  const intl = useIntl();

  const handleClose = (event: React.MouseEvent) => {
    event.preventDefault();

    onClose();
  };

  return (
    <div className={styles.success}>
      <Text type="p-18-semi-bold">Content Success</Text>

      <Button
        className={classNames('p-30-semi-bold', styles.btn)}
        onClick={handleClose}
      >
        {intl.formatMessage({ id: 'common.close' })}
      </Button>
    </div>
  );
};

export default Success;
