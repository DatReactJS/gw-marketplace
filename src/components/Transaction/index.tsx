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

export enum StatusError {
  INSUFFICIENT_BALANCE = 'insufficient_balance',
  AUTHENTICATED = 'authenticated',
}

const Transaction: React.FC<Props & Ref> = React.forwardRef(
  ({ refresh }: Props, ref: Ref['ref']) => {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [status, setStatus] = React.useState<Status>(Status.LOADING);
    const [hash, setHash] = React.useState<string>('');
    const [error, setError] = React.useState<StatusError | undefined>();

    const onClose = () => {
      setVisible(false);
      setStatus(Status.LOADING);
      setHash('');
      setError(undefined);

      if (visible && status === Status.SUCCESS) {
        setTimeout(() => refresh?.(), 500);
      }
    };

    const onVisible = () => setVisible((prevVisible: boolean) => !prevVisible);

    const changeStatus = ({
      status: newStatus,
      hash: newHash = '',
      error,
    }: {
      status: Status;
      hash?: string;
      error?: StatusError;
    }) => {
      setStatus(newStatus);
      setHash(newHash);

      if (error) {
        setError(error);
      }
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
          return <Success hash={hash} />;
        case Status.FAILED:
          return <Failed error={error} onClose={onClose} />;
        case Status.PROCESSING:
          return <Processing hash={hash} />;
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

    const closable: boolean = ![Status.LOADING, Status.PROCESSING].includes(
      status,
    );

    return (
      <div className={styles.transaction}>
        <Modal
          visible={visible}
          onClose={onClose}
          closable={closable}
          maskClosable={closable}
          content={renderContent()}
        />
      </div>
    );
  },
);

export default Transaction;
