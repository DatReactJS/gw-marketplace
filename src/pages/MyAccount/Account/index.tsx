import React from 'react';
import styles from './index.less';

interface Props {}

const Account: React.FC<Props> = (props: Props) => {
  return <div className={styles.account}>Account</div>;
};

export default Account;
