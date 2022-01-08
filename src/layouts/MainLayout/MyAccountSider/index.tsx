import React from 'react';
import styles from './index.less';
import Menu from './Menu';

interface Props {
  children?: React.ReactNode;
}

const MyAccountSider: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.myAccountSider}>
      <Menu />
      {props?.children && <div className={styles.main}>{props.children}</div>}
    </div>
  );
};

export default MyAccountSider;
