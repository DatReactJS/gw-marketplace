import React from 'react';
import styles from './index.less';
import Icon from '@/components/Icon';
function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <hr />
        <div className={styles.social}>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <Icon icon="path14" size={24} color="#1AD7FD"></Icon>
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <Icon icon="YouTube-Icon" size={24} color="#1AD7FD"></Icon>
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <Icon icon="Vector-2" size={24} color="#1AD7FD"></Icon>
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <Icon icon="Group" size={24} color="#1AD7FD"></Icon>
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <Icon icon="Vector-4" size={24} color="#1AD7FD"></Icon>
          </a>
        </div>
        <h5>Copyright 2021 galactic war</h5>
      </div>
    </>
  );
}

export default Footer;
