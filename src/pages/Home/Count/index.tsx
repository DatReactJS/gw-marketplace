import * as React from 'react';
import styles from './index.less';
function Count() {
  return (
    <>
      <div className={styles.countDown}>
        <img
          className={styles.bg}
          src="/assets/images/home/Group-232.webp"
          alt=""
        />

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
      </div>
    </>
  );
}

export default Count;
