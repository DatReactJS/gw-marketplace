import React from 'react';
import styles from './index.less';

interface Props {}

const Inventory: React.FC<Props> = (props: Props) => {
  return <div className={styles.inventory}>Inventory</div>;
};

export default Inventory;
