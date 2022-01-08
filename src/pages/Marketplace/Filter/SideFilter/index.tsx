import FormItem from '@/components/Form';
import { TabsEnum } from '@/components/Tabs';
import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import Attack from './Attack';
import BuffAmount from './BuffAmount';
import Classes from './Classes';
import Defend from './Defend';
import HP from './HP';
import styles from './index.less';
import Rarities from './Rarities';
import Speed from './Speed';
import Stats from './Stats';

interface Props {
  total: number;
  onClear: () => void;
  tab: TabsEnum;
}

const SideFilter: React.FC<Props> = ({ total, onClear, tab }: Props) => {
  const intl = useIntl();

  return (
    <div className={styles.sideFilter}>
      <div className={styles.content}>
        <div className={styles.head}>
          <div className={styles.titleFilter}>
            <img alt="" src="/assets/images/filter.png" />
            <Text type="headline-20-semi-bold" className={styles.txt}>
              {intl.formatMessage(
                { id: `filter.${total > 0 ? 'total' : 'filter'}` },
                { total },
              )}
            </Text>
          </div>

          <Text
            type="body-14-semi-bold"
            color="accent-500"
            onClick={onClear}
            disabled={total === 0}
          >
            {intl.formatMessage({ id: 'filter.clear' })}
          </Text>
        </div>

        <div className={styles.allFilter}>
          {tab === TabsEnum.CHARACTER && (
            <>
              {' '}
              <FormItem name="classes" preserve>
                <Classes />
              </FormItem>
            </>
          )}

          <FormItem name="rarities" preserve>
            <Rarities />
          </FormItem>

          {tab === TabsEnum.SHIP && (
            <>
              <FormItem name="buffAmount" preserve>
                <BuffAmount />
              </FormItem>
            </>
          )}

          {tab === TabsEnum.ACCESORY && (
            <>
              <FormItem name="stat" preserve>
                <Stats />
              </FormItem>

              <FormItem name="hp" preserve>
                <HP />
              </FormItem>

              <FormItem name="atk" preserve>
                <Attack />
              </FormItem>

              <FormItem name="def" preserve>
                <Defend />
              </FormItem>

              <FormItem name="spd" preserve>
                <Speed />
              </FormItem>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideFilter;
