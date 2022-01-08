import React from 'react';
import styles from './loading.less';
import loadImg from './ic-loading.png';

const Loading: React.FC = () => {
  return (
    <div className={styles.loading}>
      <img src={loadImg} alt="" />
    </div>
  );
};

export default Loading;
