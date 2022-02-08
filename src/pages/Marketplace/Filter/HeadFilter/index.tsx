import FormItem from '@/components/Form';
import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import Sorter from './Sorter';
import Type from './Type';
import numeral from 'numeral';

interface Props {
  total: number;
}

const HeadFilter: React.FC<Props> = ({ total }: Props) => {
  const intl = useIntl();

  return (
    <div className={styles.headFilter}>
      <Text type="headline-20-semi-bold">
        {intl.formatMessage(
          { id: `filter.${total > 1 ? 'items' : 'item'}` },
          { total: numeral(total).format('0,0') },
        )}
      </Text>
      <div className={styles.filter}>
        <FormItem name="type">
          <Type
            placeholder={intl.formatMessage({ id: 'filter.type.forSale' })}
          />
        </FormItem>
        <FormItem name="sort">
          <Sorter
            placeholder={intl.formatMessage({ id: 'filter.sorter.highestID' })}
          />
        </FormItem>
      </div>
    </div>
  );
};

export default HeadFilter;
