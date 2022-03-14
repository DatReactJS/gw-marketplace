import RCSelect from '@/components/Select';
import Text from '@/components/Text';
import React from 'react';
import styles from './index.less';

interface Props {
  value?: string[];
  onChange?: Function;
}
interface TabItem {
  label: string;
  value: string;
}
const optionsSelect: TabItem[] = [
  {
    label: 'price',
    value: 'price',
  },
  {
    label: 'Level',
    value: 'Level',
  },
  {
    label: 'Rarity',
    value: 'Rarity',
  },
];
const SortBy: React.FC<Props> = ({ value = [], onChange }: Props) => {
  return (
    <div className={styles.SortBy}>
      <RCSelect
        options={optionsSelect}
        className={styles.select}
        defaultValue="price"
        placeholder="Sort by:"
      />
    </div>
  );
};

export default SortBy;
