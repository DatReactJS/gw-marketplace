import React from 'react';
import styles from './index.less';
import Modal from '@/components/Modal';
function StakingModal() {
  return (
    <>
      <Modal visible={true}>
        <div className={styles.StakingModal}>
          <header>
            <h1>hello world</h1>
            <button>x</button>
          </header>
          <main>
            <label htmlFor="amount">
              The staking will be locked for 5 days, after that you can unstake
              any time. Enter the staking value:
            </label>
            <form action="">
              <fieldset></fieldset>
              <input type="text" name="amount" />
            </form>
          </main>
        </div>
      </Modal>
    </>
  );
}

export default StakingModal;
