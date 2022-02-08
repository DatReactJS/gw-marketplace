import FormItem from '@/components/Form';
import { TabsEnum } from '@/components/Tabs';
import Text from '@/components/Text';
import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'umi';
import Agility from './Agility';
import Attack from './Attack';
import BuffAmount from './BuffAmount';
import Classes from './Classes';
import Defend from './Defend';
import HP from './HP';
import styles from './index.less';
import Intelligence from './Intelligence';
import Rarities from './Rarities';
import Speed from './Speed';
import Stats from './Stats';
import Strength from './Strength';
import Vitality from './Vitality';

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
            className={classNames({
              [styles.clear]: total > 0,
            })}
          >
            {intl.formatMessage({ id: 'filter.clear' })}
          </Text>
        </div>

        <div className={styles.allFilter}>
          {tab === TabsEnum.CHARACTER && (
            <FormItem name="classes">
              <Classes />
            </FormItem>
          )}

          <FormItem name="rarities">
            <Rarities />
          </FormItem>

          {tab === TabsEnum.CHARACTER && (
            <>
              <FormItem name="vit">
                <Vitality />
              </FormItem>
              <FormItem name="str">
                <Strength />
              </FormItem>
              <FormItem name="agi">
                <Agility />
              </FormItem>
              <FormItem name="int">
                <Intelligence />
              </FormItem>
              <FormItem name="spd">
                <Speed />
              </FormItem>
            </>
          )}

          {tab === TabsEnum.SHIP && (
            <>
              <FormItem name="buffAmount">
                <BuffAmount />
              </FormItem>
            </>
          )}

          {tab === TabsEnum.ACCESORY && (
            <>
              <FormItem name="stat">
                <Stats />
              </FormItem>

              <FormItem name="hp">
                <HP />
              </FormItem>

              <FormItem name="atk">
                <Attack />
              </FormItem>

              <FormItem name="def">
                <Defend />
              </FormItem>

              <FormItem name="spd">
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
