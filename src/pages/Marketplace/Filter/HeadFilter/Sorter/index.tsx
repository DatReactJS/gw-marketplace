import Select from '@/components/Select';
import { useIntl } from 'umi';
import styles from './index.less';

export enum SorterValues {
  HIGHEST_ID = 'highestID',
  LOWEST_ID = 'lowestID',
  HIGHEST_STAR = 'highestStar',
  LOWEST_STAR = 'lowestStar',
}

interface Props {
  value?: string;
  onChange?: Function;
}

const Sorter: React.FC<Props> = ({
  onChange,
  value = SorterValues.HIGHEST_ID,
}: Props) => {
  const intl = useIntl();
  return (
    <Select
      options={[
        {
          value: SorterValues.HIGHEST_ID,
          label: intl.formatMessage({ id: 'filter.sorter.highestID' }),
        },
        {
          value: SorterValues.LOWEST_ID,
          label: intl.formatMessage({ id: 'filter.sorter.lowestID' }),
        },
        {
          value: SorterValues.HIGHEST_STAR,
          label: intl.formatMessage({ id: 'filter.sorter.highestStar' }),
        },
        {
          value: SorterValues.LOWEST_STAR,
          label: intl.formatMessage({ id: 'filter.sorter.lowestStar' }),
        },
      ]}
      value={value}
      onChange={(newValue) => {
        if (onChange) {
          onChange(newValue);
        }
      }}
      className={styles.selectSorter}
    />
  );
};

export default Sorter;
