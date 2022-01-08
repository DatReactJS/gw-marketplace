import React from 'react';
import Modal from '../Modal';
import Failed from './Failed';
import styles from './index.less';
import InsufficicentBalance from './InsufficientBalance';
import Loading from './Loading';
import Processing from './Processing';
import Rejected from './Rejected';
import Success from './Success';
import Unknown from './Unknown';

interface Props {
  refresh?: () => void | undefined;
}

interface Ref {
  ref: React.Ref<any>;
}

export enum Status {
  LOADING = 'loading',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  FAILED = 'failed',
  REJECTED = 'rejected',
  INSUFFICIENT_BALANCE = 'insufficient_balance',
  UNKNOWN = 'unknown',
}

const Transaction: React.FC<Props & Ref> = React.forwardRef(
  ({ refresh }: Props, ref: Ref['ref']) => {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [status, setStatus] = React.useState<Status>(Status.LOADING);
    const [hash, setHash] = React.useState<string>('');

    const onClose = () => {
      setVisible(false);
      setStatus(Status.LOADING);
      setHash('');

      if (visible && status === Status.SUCCESS) {
        setTimeout(() => refresh?.(), 500);
      }
    };

    const onVisible = () => setVisible((prevVisible: boolean) => !prevVisible);

    const changeStatus = ({
      status: newStatus,
      hash: newHash = '',
    }: {
      status: Status;
      hash?: string;
    }) => {
      setStatus(newStatus);
      setHash(newHash);
    };

    React.useImperativeHandle(
      ref,
      () => ({ onClose, onVisible, changeStatus }),
      [],
    );

    const renderContent = () => {
      switch (status) {
        case Status.LOADING:
          return <Loading />;
        case Status.SUCCESS:
          return <Success hash={hash} onClose={onClose} />;
        case Status.FAILED:
          return <Failed onClose={onClose} />;
        case Status.PROCESSING:
          return <Processing />;
        case Status.REJECTED:
          return <Rejected onClose={onClose} />;
        case Status.INSUFFICIENT_BALANCE:
          return <InsufficicentBalance onClose={onClose} />;
        case Status.UNKNOWN:
          return <Unknown onClose={onClose} />;
        default:
          return null;
      }
    };

    return (
      <div className={styles.transaction}>
        <Modal
          visible={visible}
          onClose={onVisible}
          closable={false}
          maskClosable={false}
          content={renderContent()}
        />
      </div>
    );
  },
);

export default Transaction;
