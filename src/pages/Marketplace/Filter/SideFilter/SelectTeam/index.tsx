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
const SelectTeam: React.FC<Props> = ({ value = [], onChange }: Props) => {
  return (
    <div className={styles.SelectTeam}>
      <RCSelect
        options={optionsSelect}
        className={styles.select}
        placeholder="Select team"
        iconLabel={
          <img alt="arrow" src="/assets/images/marketplace/ic-people.png" />
        }
      />
    </div>
  );
};

export default SelectTeam;
