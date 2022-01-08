import React from 'react';
import { useIntl } from 'umi';
import Button from '../Button';
import Modal from '../Modal';
import Text from '../Text';
import styles from './index.less';

interface Props {
  onBuy: () => void;
}

const BuyNow: React.FC<Props> = ({ onBuy }: Props) => {
  const intl = useIntl();

  const [visible, setVisible] = React.useState<boolean>(false);

  const onVisible = () => setVisible(!visible);

  const onConfirm = (event: React.MouseEvent) => {
    event.preventDefault();
    onVisible();

    onBuy();
  };

  return (
    <div className={styles.buyNow}>
      <Button className={styles.btn} onClick={onVisible}>
        {intl.formatMessage({ id: 'common.buyNow' })}
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
              {intl.formatMessage({ id: 'common.confirmPayment' })}
            </Text>

            <Text type="body-14-regular" color="primary-100">
              {intl.formatMessage({ id: 'common.description' })}
            </Text>

            <Button className={styles.btnConfirm} onClick={onConfirm}>
              {intl.formatMessage({ id: 'common.confirm' })}
            </Button>
          </div>
        }
        className={styles.modalBuyNow}
      />
    </div>
  );
};

export default BuyNow;
