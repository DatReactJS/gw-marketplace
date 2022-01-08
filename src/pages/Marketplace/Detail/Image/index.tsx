import Text from '@/components/Text';
import React from 'react';
import { history } from 'umi';
import styles from './index.less';

interface Props {}

const Image: React.FC<Props> = (props: Props) => {
  const goBack = () => history.goBack();
  return (
    <div className={styles.image}>
      <div className={styles.goBack} onClick={goBack}>
        <img alt="" src="/assets/images/arrow_right_white.svg" />
      </div>

      <Text type="body-16-semi-bold" className={styles.id}>
        #62354876
      </Text>

      <div className={styles.img}>
        <img alt="" src="/assets/images/char/char2.png" />
      </div>
    </div>
  );
};

export default Image;
