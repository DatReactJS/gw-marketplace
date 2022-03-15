import * as React from 'react';
import styles from './index.less';
function Footer() {
  return (
    <>
      <footer>
        <aside className={styles.right}>
          <img src="/assets/images/home/Mask-group.webp" alt="" />
          spacecraft #1
        </aside>

        <aside className={styles.mid}>
          <img src="/assets/images/home/Panel_Time02-2.webp" alt="" />
          vs
        </aside>

        <aside className={styles.left}>
          <img src="/assets/images/home/Btn_MainMenuYellow_p 2.png" alt="" />
          spacecraft #2
        </aside>
      </footer>
    </>
  );
}

export default Footer;
