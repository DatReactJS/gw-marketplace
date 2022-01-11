import Text from '@/components/Text';
import React from 'react';
import { toast } from 'react-toastify';
import { history, useIntl } from 'umi';
import styles from './index.less';

interface Props {}

const Image: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  const goBack = () => history.goBack();

  const handleClickID = () => {
    navigator.clipboard?.writeText?.('62354876');
    toast.success(intl.formatMessage({ id: 'common.copied' }));
  };

  return (
    <div className={styles.image}>
      <div className={styles.goBack} onClick={goBack}>
        <img alt="" src="/assets/images/ic-arrow-large.png" />
      </div>

      <Text
        type="body-16-semi-bold"
        className={styles.id}
        onClick={handleClickID}
      >
        #62354876
      </Text>

      <div className={styles.img}>
        <img alt="" src="/assets/images/char/char2.png" />
      </div>
    </div>
  );
};

export default Image;
