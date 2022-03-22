import React from 'react';
import styles from './index.less';
import Footer from '@/components/Footer';
import Stake from './Stake';
import StakingModal from './StakingModal';
const Stakes = [
  {
    name: 'GLW Investors',
    img: '/assets/images/staking/image 16.png',
    APR: '200%',
    min: '300',
    lock_days: '5 days',
    status: '1,655,301.22 / 2,000,000.00',
  },
  {
    name: 'GLW lovers',
    img: '/assets/images/staking/Layer 8 5.png',
    APR: '200%',
    min: '300',
    lock_days: '5 days',
    status: '1,655,301.22 / 2,000,000.00',
  },
  {
    name: 'GLW whitelist',
    img: '/assets/images/staking/Layer 8 3.png',
    APR: '200%',
    min: '300',
    lock_days: '5 days',
    status: '1,655,301.22 / 2,000,000.00',
    open: false,
  },
];
function Staking() {
  return (
    <>
      <div className={styles.staking}>
        <div className={styles.container}>
          <div className={styles.bg}>
            <picture>
              <source
                srcSet="/assets/images/staking/bgDesktop.png"
                media="(min-width:1024px)"
              />
              <img src="/assets/images/staking/bg.png" alt="" />
            </picture>
          </div>
          <header>
            <h1>Pools</h1>
            <img src="/assets/images/home/组-34-1.webp" alt="" />
          </header>
          <main className={styles.main}>
            {Stakes.map((item) => {
              return (
                <aside key={item.name}>
                  <Stake {...item} />
                </aside>
              );
            })}
          </main>
          <Footer />
        </div>
      </div>
      <StakingModal />
    </>
  );
}

export default Staking;
