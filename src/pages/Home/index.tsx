import * as React from 'react';
import styles from './index.less';
import Count from './Count';
import Footer from './Footer';
function Home() {
  return (
    <>
      <div className={styles.home}>
        <div className={styles.bg}>
          <img
            className={styles.bg_top}
            src="/assets/images/home/226347986-AdobeStock_226347986 3 (1).png"
            alt=""
          />
          <img
            className={styles.bg_bottom}
            src="/assets/images/home/226347986-AdobeStock_226347986 4.png"
            alt=""
          />
        </div>
        <Count />
      </div>
    </>
  );
}

export default Home;
