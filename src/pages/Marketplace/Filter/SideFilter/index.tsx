import FormItem from '@/components/Form';
import { TabsEnum } from '@/components/Tabs';
import Text from '@/components/Text';
import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import Search from './Search';
import SortBy from './SortBy';
import SelectTeam from './SelectTeam';
import Level from './Level';
import Rarities from './Rarities';

interface Props {
  total: number;
  onClear: () => void;
  tab: TabsEnum;
  showFilter?: boolean;
}

const SideFilter: React.FC<Props> = ({
  total,
  onClear,
  tab,
  showFilter,
}: Props) => {
  const intl = useIntl();

  return (
    <div className={`${styles.sideFilter}`}>
      <div className={styles.content}>
        <div className={styles.head}>
          <div className={styles.titleFilter}>
            <Text
              type="body-16-bold"
              font="font-Michroma"
              className={styles.txt}
            >
              {intl.formatMessage(
                { id: `filter.${total > 0 ? 'total' : 'filter'}` },
                { total },
              )}
            </Text>
          </div>
          <div className={styles.close}>
            <img alt="close" src="/assets/images/marketplace/ic-close.png" />
            <Text
              type="body-14-regular"
              color="neutral-0"
              onClick={onClear}
              className={classNames({
                [styles.clear]: total > 0,
              })}
            >
              {intl.formatMessage({ id: 'filter.clear' })}
            </Text>
          </div>
        </div>

        <div className={styles.allFilter}>
          <div className={styles.border}>
            <FormItem name="sortBy" className={styles.allFilterItem}>
              <SortBy />
            </FormItem>
            <FormItem name="search" className={styles.allFilterItem}>
              <Search />
            </FormItem>
            <FormItem name="SelectTeam" className={styles.allFilterItem}>
              <SelectTeam />
            </FormItem>
          </div>
          <div className={styles.border}>
            <FormItem name="SelectTeam" className={styles.allFilterItem}>
              <Level />
            </FormItem>
          </div>
          <div className={styles.border}>
            <FormItem name="Rarities" className={styles.allFilterItem}>
              <Rarities />
            </FormItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideFilter;
