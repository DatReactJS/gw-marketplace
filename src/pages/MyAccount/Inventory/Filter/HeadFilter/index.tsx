import Button from '@/components/Button';
import FormItem from '@/components/Form';
import { TabsEnum } from '@/components/Tabs';
import Sorter from '@/pages/Marketplace/Filter/HeadFilter/Sorter';
import Type from '@/pages/Marketplace/Filter/HeadFilter/Type';
import SideFilter from '@/pages/Marketplace/Filter/SideFilter';
import { useClickAway } from '@umijs/hooks';
import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {
  total: number;
  onClear: () => void;
  tab: TabsEnum;
}

const HeadFilter: React.FC<Props> = ({ total, onClear, tab }: Props) => {
  const intl = useIntl();

  const [isShowSideFilter, setShowSideFilter] = React.useState<boolean>(false);

  const divRef = useClickAway(() => {
    setShowSideFilter(false);
  });

  const onClickFilter = (event: React.MouseEvent) => {
    event.preventDefault();

    setShowSideFilter(!isShowSideFilter);
  };

  return (
    <div className={styles.headFilter}>
      <FormItem name="type" preserve>
        <Type placeholder={intl.formatMessage({ id: 'filter.type.all' })} />
      </FormItem>

      <div className={styles.right}>
        <div className={styles.filter} ref={divRef}>
          <Button
            className={styles.btnFilter}
            type="outline"
            icon={<img alt="" src="/assets/images/filter-outline.png" />}
            onClick={onClickFilter}
          >
            {intl.formatMessage(
              { id: `filter.${total > 0 ? 'total' : 'filter'}` },
              { total },
            )}
          </Button>

          {isShowSideFilter && (
            <div
              className={classNames(styles.wrapperSideFilter, {
                [styles.haveTotal]: total > 0,
              })}
            >
              <SideFilter total={total} onClear={onClear} tab={tab} />
            </div>
          )}
        </div>

        <FormItem name="sort" preserve>
          <Sorter
            placeholder={intl.formatMessage({ id: 'filter.sorter.highestID' })}
          />
        </FormItem>
      </div>
    </div>
  );
};

export default HeadFilter;
