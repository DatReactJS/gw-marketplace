import React from 'react';
import { useIntl } from 'umi';
import Button from '../Button';
import Modal from '../Modal';
import Text from '../Text';
import styles from './index.less';

interface Props {
  onCancel: () => void;
}

const CancelSell: React.FC<Props> = ({ onCancel }: Props) => {
  const intl = useIntl();

  const [visible, setVisible] = React.useState<boolean>(false);

  const onVisible = () => setVisible(!visible);

  const onConfirm = (event: React.MouseEvent) => {
    event.preventDefault();
    onVisible();

    onCancel();
  };

  return (
    <div className={styles.cancelSell}>
      <Button className={styles.btn} onClick={onVisible}>
        {intl.formatMessage({ id: 'common.cancelSell' })}
      </Button>

      <Modal
        visible={visible}
        onClose={onVisible}
        content={
          <div className={styles.content}>
            <img
              alt=""
              src="/assets/images/infor_big.svg"
              className={styles.iconInfo}
            />

            <Text type="title-24-semi-bold">
              {intl.formatMessage({ id: 'common.cancelSell' })}
            </Text>

            <Text type="body-14-regular" color="primary-100">
              {intl.formatMessage({ id: 'common.cancelSell.description' })}
            </Text>

            <Button className={styles.btnConfirm} onClick={onConfirm}>
              {intl.formatMessage({ id: 'common.confirm' })}
            </Button>
          </div>
        }
        className={styles.modalCancelSell}
      />
    </div>
  );
};

export default CancelSell;
