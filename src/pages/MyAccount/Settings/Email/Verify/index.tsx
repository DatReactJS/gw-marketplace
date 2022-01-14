import Modal from '@/components/Modal';
import { useRequest } from '@umijs/hooks';
import React from 'react';
import Failed from './Failed';
import styles from './index.less';
import Info from './Info';
import Processing from './Processing';
import Success from './Success';

interface Props {
  refresh: () => void;
}

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
  ({ refresh }: Props, ref: Ref['ref']) => {
    const [status, setStatus] = React.useState<StatusVerify>(StatusVerify.INFO);
    const [email, setEmail] = React.useState('');
    const [visible, setVisible] = React.useState<boolean>(false);

    const onVisible = () => setVisible(!visible);

    const onClose = () => {
      setVisible(false);
      setEmail('');
      setStatus(StatusVerify.INFO);

      if (status == StatusVerify.SUCCESS) {
        refresh();
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
