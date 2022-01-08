import React from 'react';
import styles from './index.less';

interface Props {}

const Settings: React.FC<Props> = (props: Props) => {
  return <div className={styles.settings}>Settings</div>;
};

export default Settings;
