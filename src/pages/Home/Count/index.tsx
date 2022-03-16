import * as React from 'react';
import styles from './index.less';
import Footer from './Footer';
function Count() {
  return (
    <>
      <div className={styles.countDown}>
        <div className={styles.bg}>
          <img
            className={styles.layer}
            src="/assets/images/home/226347986-AdobeStock_226347986 3 (1).png"
            alt=""
          />
          <img
            className={styles.main}
            src="/assets/images/home/Group-232.webp"
            alt=""
          />
        </div>

        <aside className={styles.left}>
          <img src="/assets/images/home/Layer-3-2.webp" alt="" />
        </aside>

        <aside className={styles.right}>
          <img src="/assets/images/home/Layer-8-5.webp" alt="" />
        </aside>

        <div className={styles.content}>
          <h3>remaining time</h3>

          <img src="/assets/images/home/组-34-1.webp" alt="" />

          <div className={styles.time}>
            <div className={styles.days}>
              <header>02</header>
              <footer>days</footer>
            </div>
            <span>:</span>
            <div className={styles.hours}>
              <header>02</header>
              <footer>hours</footer>
            </div>
            <span>:</span>
            <div className={styles.minutes}>
              <header>02</header>
              <footer>minutes</footer>
            </div>
          </div>
        </div>

        <Footer />

        <h3 className={styles.total}>
          total:
          <img src="/assets/images/navbar/Icon_ExampleCoin0 1.png" alt="" />
          <span>10310</span>
        </h3>
        <h4 className={styles.h4}>bet on spacecraft#1</h4>
      </div>
    </>
  );
}

export default Count;