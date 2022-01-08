import FormItem from '@/components/Form';
import React from 'react';
import styles from './index.less';
import Sorter from './Sorter';
import Type from './Type';

interface Props {}

const HeadFilter: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.headFilter}>
      <FormItem name="type" preserve>
        <Type />
      </FormItem>
      <FormItem name="sort" preserve>
        <Sorter />
      </FormItem>
    </div>
  );
};

export default HeadFilter;
