import FormItem from '@/components/Form';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import Sorter from './Sorter';
import Type from './Type';

interface Props {}

const HeadFilter: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  return (
    <div className={styles.headFilter}>
      <FormItem name="type" preserve>
        <Type placeholder={intl.formatMessage({ id: 'filter.type.forSale' })} />
      </FormItem>
      <FormItem name="sort" preserve>
        <Sorter
          placeholder={intl.formatMessage({ id: 'filter.sorter.highestID' })}
        />
      </FormItem>
    </div>
  );
};

export default HeadFilter;
