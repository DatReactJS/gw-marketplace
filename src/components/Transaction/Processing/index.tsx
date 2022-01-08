import Text from '@/components/Text';
import React from 'react';
import styles from './index.less';

interface Props {}

const Processing: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.processing}>
      <Text type="p-18-semi-bold">Content Processing</Text>
    </div>
  );
};

export default Processing;
