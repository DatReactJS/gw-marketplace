import * as React from 'react';
import styles from './index.less';
import Count from './Count';
import Spacecraft from './Spacecraft';
function Home() {
  return (
    <>
      <div className={styles.home}>
        <Count />
        <Spacecraft />
      </div>
    </>
  );
}

export default Home;
