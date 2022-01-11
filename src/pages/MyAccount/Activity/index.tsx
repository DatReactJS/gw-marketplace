import React from 'react';
import ActivityItem from './ActivityItem';
import { useIntl } from 'umi';
import styles from './index.less';
import Text from '@/components/Text';

interface Props {}

const Activity: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  return (
    <div className={styles.containerActivities}>
      <div className={styles.header}>
        <Text type="title-24-semi-bold" color="primary-100">
          {intl.formatMessage({ id: 'activity.activitiy' })}
        </Text>
      </div>
      <ActivityItem />
    </div>
  );
};

export default Activity;
