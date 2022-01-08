import React from 'react';
import styles from './index.less';

interface Props {}

const SideFilter: React.FC<Props> = (props: Props) => {
  return <div className={styles.sideFilter}>SideFilter</div>;
};

export default SideFilter;
