import React from 'react';
import Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';
import './index.less';

import Text from '../Text';

import classNames from 'classnames';

interface ModalProps {
  visible?: boolean;
  children?: React.ReactNode;
  title?: String | React.ReactElement | undefined;
  footer?: React.ReactElement | undefined;
  content?: string | React.ReactNode | undefined;
  className?: string;
  style?: Object;
  zIndex?: number;
  closeIcon?: React.ReactNode;
  centered?: boolean;
  onClose?: () => void;
  width?: number;
  closable?: boolean;
  maskClosable?: boolean;
}

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const {
    visible,
    centered = true,
    children,
    closeIcon,
    className,
    title,
    content,
    width = 443,
    onClose,
    ...rest
  } = props;

  return (
    <>
      {children}

      <Dialog
        visible={visible}
        width={width}
        wrapClassName={classNames('bat-modal', className, {
          ['bat-modal-centered']: centered,
        })}
        animation="zoom"
        maskAnimation="fade"
        onClose={onClose}
        closeIcon={<img alt="" src="/assets/images/ic-cancel.png" />}
        keyboard={false}
        {...rest}
      >
        {title && (
          <Text type="title-30-semi-bold" className="modal-title">
            {title}
          </Text>
        )}

        {content && <div className="modal-body">{content}</div>}
      </Dialog>
    </>
  );
};

export default Modal;
