import * as React from 'react';
import styles from './index.less';
import Count from './Count';
function Home() {
  return (
    <>
      <div className={styles.home}>
        <Count />
      </div>
    </>
  );
}

export default Home;
