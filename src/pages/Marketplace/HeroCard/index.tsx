import { TabsEnum } from '@/components/Tabs';
import Text from '@/components/Text';
import classNames from 'classnames';
import React from 'react';
import { history, useIntl, useLocation } from 'umi';
import styles from './index.less';

interface Props {}

const HeroCard: React.FC<Props> = (props: Props) => {
  const location: any = useLocation();
  const intl = useIntl();

  const heroType: string = location.query?.tab || TabsEnum.CHARACTER;

  const navigateDetail = () => {
    history.push(`/${heroType}/1`);
  };

  return (
    <div
      className={classNames(styles.heroCard, {
        [styles.common]: false,
        [styles.rare]: false,
        [styles.epic]: false,
        [styles.legendary]: true,
      })}
      onClick={navigateDetail}
    ></div>
  );
};

export default HeroCard;
