import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import { useRequest } from '@umijs/hooks';
import { api, API_PATHS, privateRequest } from '@/utils/apis';

interface Props {}

const QR: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  const [visible, setVisible] = React.useState(false);

  const qrRequest = useRequest(
    async () => {
      const getQr = await privateRequest(api.get, API_PATHS.LOGIN_QR_CODE, {
        responseType: 'blob',
      });
      if (getQr) {
        const urlCreator = window?.URL || window?.webkitURL;
        const imageUrl: string = urlCreator.createObjectURL(getQr);
        return imageUrl;
      }
    },
    {
      manual: true,
      onSuccess: (result) => {
        if (result) {
          onVisible();
        }
      },
      onError: (error: Error) => {
        console.log('🚀 ~ error', error);
      },
    },
  );

  const onVisible = () => setVisible(!visible);

  const handleClickShow = () => {
    qrRequest.run();
  };

  return (
    <div className={styles.qr}>
      <Button
        type="outline"
        className={styles.btnShow}
        icon={<img alt="" src="/assets/images/qr.svg" />}
        onClick={handleClickShow}
        loading={qrRequest.loading}
      >
        Show QR
      </Button>

      <Modal
        visible={visible}
        onClose={onVisible}
        maskClosable={false}
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
              <img src={qrRequest.data} alt="" className={styles.code} />
              <img
                src="/assets/images/logo-small.png"
                className={styles.logo}
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
