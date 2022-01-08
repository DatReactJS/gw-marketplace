import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {}

const Loading: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  return (
    <div className={styles.loading}>
      <img
        alt=""
        src="/assets/images/ic-loader.png"
        className={styles.loader}
      />
      <Text type="p-20-medium-teko">
        {intl.formatMessage({ id: 'common.loading.textInfo' })}
      </Text>
    </div>
  );
};

export default Loading;
