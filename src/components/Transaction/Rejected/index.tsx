import Button from '@/components/Button';
import Text from '@/components/Text';
import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {
  onClose: () => void;
}

const Rejected: React.FC<Props> = ({ onClose }: Props) => {
  const intl = useIntl();

  const handleClose = (event: React.MouseEvent) => {
    event.preventDefault();

    onClose();
  };

  return (
    <div className={styles.rejected}>
      <Text type="p-18-semi-bold">Content Rejected</Text>

      <Button
        className={classNames('p-30-semi-bold', styles.btn)}
        onClick={handleClose}
      >
        {intl.formatMessage({ id: 'common.close' })}
      </Button>
    </div>
  );
};

export default Rejected;
