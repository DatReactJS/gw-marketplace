import Modal from '@/components/Modal';
import { useRequest } from '@umijs/hooks';
import React from 'react';
import { history, useLocation } from 'umi';
import Failed from './Failed';
import styles from './index.less';
import Info from './Info';
import Processing from './Processing';
import Success from './Success';

interface Props {}

interface Ref {
  ref: React.Ref<any>;
}

export enum StatusVerify {
  INFO,
  SUCCESS,
  FAILED,
  PROCESSING,
}

const Verify: React.FC<Props & Ref> = React.forwardRef(
  (props: Props, ref: Ref['ref']) => {
    const location: any = useLocation();

    const [email, setEmail] = React.useState('');

    const checkIsVisible = (): boolean => {
      if (location.query) {
        if (
          location.query?.type === 'Confirm' &&
          location.query?.address &&
          location.query?.email &&
          location.pathname === '/email'
        ) {
          return true;
        }
      }

      return false;
    };

    const [visible, setVisible] = React.useState<boolean>(checkIsVisible());
    const [status, setStatus] = React.useState<StatusVerify>(
      checkIsVisible() ? StatusVerify.SUCCESS : StatusVerify.INFO,
    );

    const onVisible = () => setVisible(!visible);

    const onClose = () => {
      setVisible(false);
      setEmail('');
      setStatus(StatusVerify.INFO);

      if (status == StatusVerify.SUCCESS) {
        history.push('/account/settings');
      }
    };

    const changeStatus = (newStatus: StatusVerify) => {
      setVisible(true);
      setStatus(newStatus);
    };

    React.useImperativeHandle(
      ref,
      () => ({ onVisible, setEmail, changeStatus }),
      [],
    );

    const confirmRequest = useRequest(
      () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(1);
          }, 500);
        });
      },
      {
        manual: true,
        onSuccess: () => {
          setStatus(StatusVerify.SUCCESS);
        },
      },
    );

    const onConfirm = () => {
      confirmRequest.run();
    };

    const renderContent = () => {
      switch (status) {
        case StatusVerify.INFO:
          return <Info email={email} />;
        case StatusVerify.PROCESSING:
          return (
            <Processing
              onConfirm={onConfirm}
              loading={confirmRequest.loading}
            />
          );
        case StatusVerify.SUCCESS:
          return <Success />;
        case StatusVerify.FAILED:
          return <Failed />;
        default:
          return null;
      }
    };

    return (
      <div className={styles.verify}>
        <Modal visible={visible} onClose={onClose} content={renderContent()} />
      </div>
    );
  },
);

export default Verify;
