import React from 'react';
import styles from './index.less';

interface Props {}

const HeadFilter: React.FC<Props> = (props: Props) => {
  return <div className={styles.headFilter}>HeadFilter</div>;
};

export default HeadFilter;
