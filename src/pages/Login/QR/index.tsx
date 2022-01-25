import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import { QRCode } from 'react-qrcode-logo';

interface Props {}

const QR: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  const [visible, setVisible] = React.useState(false);

  const onVisible = () => setVisible(!visible);

  return (
    <div className={styles.qr}>
      <Button
        type="outline"
        className={styles.btnShow}
        icon={<img alt="" src="/assets/images/ic-qr-white.png" />}
        onClick={onVisible}
      >
        Login in by QR code
      </Button>

      <Modal
        visible={visible}
        onClose={onVisible}
        content={
          <div className={styles.content}>
            <Text
              type="title-24-bold"
              color="accent-500"
              className={styles.title}
            >
              {intl.formatMessage({ id: 'login.withQrCode' })}
            </Text>

            <div className={styles.description}>
              <Text type="body-14-regular" color="primary-100">
                {intl.formatMessage({ id: 'login.dontShare' })}
              </Text>
            </div>

            <div className={styles.qrCode}>
              <QRCode
                value="Hello World"
                size={180}
                logoImage="/assets/images/logo-small.png"
                logoWidth={80}
                logoHeight={42}
                ecLevel="H"
              />
            </div>
          </div>
        }
        className={styles.modalQr}
      />
    </div>
  );
};

export default QR;
