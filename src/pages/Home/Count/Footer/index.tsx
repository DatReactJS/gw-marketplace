import * as React from 'react';
import styles from './index.less';
function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <aside className={styles.left}>
          <img src="/assets/images/home/Mask-group.webp" alt="" />
          <p>
            spacecraft
            <br />
            #1
          </p>
        </aside>

        <aside className={styles.mid}>
          <img src="/assets/images/home/Panel_Time02-2.webp" alt="" />
          <p>vs</p>
        </aside>

        <aside className={styles.right}>
          <img src="/assets/images/home/Btn_MainMenuYellow_p 2.png" alt="" />
          <p>
            spacecraft
            <br />
            #2
          </p>
        </aside>
      </footer>
    </>
  );
}

export default Footer;
