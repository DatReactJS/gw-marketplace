import React from 'react';
import styles from './index.less';
import Icon from '@/components/Icon';
function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <hr />
        <div className={styles.container}>
          <div className={styles.social}>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <Icon icon="Facebook-Icon" size={24} color="#1AD7FD"></Icon>
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <Icon icon="YouTube-Icon" size={24} color="#1AD7FD"></Icon>
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <Icon icon="bxl_telegram" size={24} color="#1AD7FD"></Icon>
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <Icon icon="Twitter-Logo" size={24} color="#1AD7FD"></Icon>
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <Icon icon="Discord-Icon" size={24} color="#1AD7FD"></Icon>
            </a>
          </div>
          <h5>Copyright 2021 galactic war</h5>
        </div>
      </footer>
    </>
  );
}

export default Footer;
