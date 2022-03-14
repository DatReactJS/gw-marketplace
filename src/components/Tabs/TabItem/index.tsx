import Text from '@/components/Text';
import { useHover, useUpdateEffect } from '@umijs/hooks';
import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'umi';
import { TabsEnum } from '..';
import styles from './index.less';

interface Props {
  value: string;
  label: string;
  isActive: boolean;
  icon: React.ReactNode;
  onChangeTab: (value: TabsEnum) => void;
}

const TabItem: React.FC<Props> = ({
  icon,
  isActive,
  label,
  onChangeTab,
  value,
}) => {
  const intl = useIntl();
  const [isHovering, hoverRef] = useHover<HTMLDivElement>();

  const onClickTab = (newTab: TabsEnum) => {
    onChangeTab(newTab);
  };

  return (
    <div
      className={classNames(styles.tab, {
        [styles.tabHover]: isHovering && !isActive,
        [styles.activeTab]: isActive,
      })}
      onClick={() => onClickTab(value as TabsEnum)}
      ref={hoverRef}
    >
      <div className={styles.info}>
        <Text
          type="body-16-bold"
          color="neutral-0"
          className={styles.label}
          font="font-Michroma"
        >
          {label}
        </Text>
      </div>
    </div>
  );
};

export default TabItem;
