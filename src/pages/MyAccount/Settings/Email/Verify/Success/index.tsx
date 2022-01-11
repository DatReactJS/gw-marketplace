import Modal from '@/components/Modal';
import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {}

interface Ref {
  ref: React.Ref<any>;
}

const Success: React.FC<Props & Ref> = React.forwardRef(
  (props: Props, ref: Ref['ref']) => {
    const intl = useIntl();

    const [visible, setVisible] = React.useState<boolean>(false);

    const onVisible = () => setVisible(!visible);

    React.useImperativeHandle(ref, () => ({ onVisible }), []);

    return (
      <div className={styles.success}>
        <Modal
          visible={visible}
          onClose={onVisible}
          className={styles.modalSuccess}
          content={
            <div className={styles.content}>
              <img
                alt=""
                src="/assets/images/success_big.svg"
                className={styles.icon}
              />

              <Text type="title-24-semi-bold">
                {intl.formatMessage({ id: 'settings.verifySuccess' })}
              </Text>

              <Text type="body-14-regular" color="primary-100">
                {intl.formatMessage({ id: 'settings.verifyDescription' })}
              </Text>
            </div>
          }
        />
      </div>
    );
  },
);

export default Success;
