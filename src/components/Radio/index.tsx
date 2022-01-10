import classNames from 'classnames';
import React from 'react';
import styles from './index.less';

interface Props {
  children: React.ReactNode;
  checked?: boolean;
  onChange?: () => void;
}

const Radio: React.FC<Props> = ({
  children,
  checked = false,
  onChange,
}: Props) => {
  return (
    <div className={styles.radio} onClick={onChange}>
      <div
        className={classNames(styles.circle, { [styles.checked]: checked })}
      />

      {checked && <div className={styles.dot} />}

      <div className={styles.element}>{children}</div>
    </div>
  );
};

export default Radio;
