import RcCheckBox from '@/components/Checkbox';
import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import Input from '@/components/Input';

interface Props {
  value?: string[];
  onChange?: Function;
}

const Search: React.FC<Props> = ({ value = [], onChange }: Props) => {
  return (
    <div className={styles.search}>
      <Input
        placeholder="Search"
        className={styles.inputSearch}
        suffix={
          <img
            alt="img-card"
            src="/assets/images/marketplace/ic-search-normal.png"
          />
        }
      />
    </div>
  );
};

export default Search;
