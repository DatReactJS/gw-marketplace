import Text from '@/components/Text';
import React from 'react';
import styles from './index.less';
import ListCharacter from './ListCharacter';
import Total from './Total';

interface Props {}

const Metrics: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.metrics}>
      <Total />
      <ListCharacter />
    </div>
  );
};

export default Metrics;
