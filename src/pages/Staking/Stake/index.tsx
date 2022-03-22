import React from 'react';
import styles from './index.less';
interface StakeProps {
  name: string;
  img: string;
  APR: string;
  min: string;
  lock_days: string;
  status: string;
  open?: boolean;
}
function Stake({
  name,
  img,
  APR,
  min,
  lock_days,
  status,
  open = true,
}: StakeProps) {
  return (
    <div className={styles.stake}>
      <picture>
        <source
          srcSet="/assets/images/staking/desktopbg.png"
          media="(min-width:1024px)"
        />
        <img
          src="/assets/images/staking/Panel_Weapon 2.png"
          alt=""
          className={styles.bgCard}
        />
      </picture>
      <header>
        <h2>{name}</h2>
        <img src="/assets/images/staking/PanelTitle_Weapon 2.png" alt="" />
      </header>
      <main>
        <figure>
          <img src={img} alt="" />
        </figure>
        <dl>
          <dt>
            <img src="/assets/images/staking/Group 198 (3).png" alt="" />
            <span>APR:</span>
            <span>{APR}</span>
          </dt>
          <dt>
            <img src="/assets/images/staking/Group 198.png" alt="" />
            <span>Min staking:</span>
            <span>{min}</span>
          </dt>
          <dt>
            <img src="/assets/images/staking/Group 198 (1).png" alt="" />
            <span>Lock days:</span>
            <span>{lock_days}</span>
          </dt>
          <dt>
            <img src="/assets/images/staking/Group 198 (2).png" alt="" />
            <span>Status:</span>
            <span>{status}</span>
          </dt>
        </dl>
      </main>

      <button
        className={
          open ? styles.stake_btn : styles.stake_btn + ' ' + styles.stakeClose
        }
      >
        <img
          src="/assets/images/staking/Btn_Rectangle04Yellow_n 1.png"
          alt=""
        />
        <span>stake</span>
      </button>
    </div>
  );
}

export default Stake;
