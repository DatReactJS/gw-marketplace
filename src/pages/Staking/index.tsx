import React from 'react';
import styles from './index.less';
import Footer from '@/components/Footer';
function Staking() {
  return (
    <div className={styles.staking}>
      <div className={styles.bg}>
        <img src="/assets/images/staking/bg.png" alt="" />
      </div>
      <header>
        <h1>Pools</h1>
        <img src="/assets/images/home/组-34-1.webp" alt="" />
      </header>
      <main>
        <aside>
          <div className={styles.Item}>
            <img
              src="/assets/images/staking/Panel_Weapon 2.png"
              alt=""
              className={styles.bg}
            />
            <header>
              <h2>GLW Investors</h2>
              <img
                src="/assets/images/staking/PanelTitle_Weapon 2.png"
                alt=""
              />
            </header>
            <figure>
              <img src="/assets/images/staking/image 16.png" alt="" />
            </figure>
            <dl>
              <dt>
                <img src="/assets/images/staking/Group 198 (3).png" alt="" />
                <span>APR:</span>
                <span>200%</span>
              </dt>
              <dt>
                <img src="/assets/images/staking/Group 198 (3).png" alt="" />
                <span>APR:</span>
                <span>200%</span>
              </dt>
              <dt>
                <img src="/assets/images/staking/Group 198 (3).png" alt="" />
                <span>APR:</span>
                <span>200%</span>
              </dt>
              <dt>
                <img src="/assets/images/staking/Group 198 (3).png" alt="" />
                <span>APR:</span>
                <span>200%</span>
              </dt>
            </dl>

            <button className={styles.stake}>
              <img
                src="/assets/images/staking/Btn_Rectangle04Yellow_n 1.png"
                alt=""
              />
              <span>stake</span>
            </button>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}

export default Staking;
