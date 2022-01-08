import React from 'react';
import styles from './index.less';

interface Props {}

const Marketplace: React.FC<Props> = (props: Props) => {
  return <div className={styles.marketplace}>Marketplace</div>;
};

export default Marketplace;
