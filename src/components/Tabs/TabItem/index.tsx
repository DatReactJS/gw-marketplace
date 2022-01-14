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
  const [isCommingSoon, setCommingSoon] = React.useState<boolean>(false);

  useUpdateEffect(() => {
    if (value !== TabsEnum.CHARACTER) {
      setCommingSoon(!!isHovering);
    }
  }, [isHovering]);

  const onClickTab = (newTab: TabsEnum) => {
    if (newTab === TabsEnum.CHARACTER) {
      return onChangeTab(newTab);
    }
  };

  return (
    <div
      className={classNames(styles.tab, {
        [styles.tabHover]: isHovering && !isActive,
      })}
      onClick={() => onClickTab(value as TabsEnum)}
      ref={hoverRef}
    >
      <div className={styles.info}>
        <div
          className={classNames(styles.icon, {
            [styles.iconActive]: isActive,
          })}
        >
          {icon}
        </div>
        <Text
          type="body-16-bold"
          color={isActive ? 'accent-500' : 'primary-100'}
          className={styles.label}
        >
          {label}
        </Text>
      </div>

      <div
        className={classNames(styles.bar, {
          [styles.barActive]: isActive,
        })}
      />

      {isCommingSoon && (
        <div className={styles.commingSoon}>
          <Text type="body-16-bold" color="accent-500">
            {intl.formatMessage({ id: 'common.commingSoon' })}
          </Text>
        </div>
      )}
    </div>
  );
};

export default TabItem;
