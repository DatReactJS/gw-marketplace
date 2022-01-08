import React from 'react';
import styles from './index.less';

interface Props {}

const Activity: React.FC<Props> = (props: Props) => {
  return <div className={styles.activity}>Activity</div>;
};

export default Activity;
