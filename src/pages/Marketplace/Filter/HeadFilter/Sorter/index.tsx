import Select from '@/components/Select';
import { useIntl } from 'umi';
import styles from './index.less';

export enum SorterValues {
  HIGHEST_ID = 'highestID',
  LOWEST_ID = 'lowestID',
  HIGHEST_PRICE = 'highestPrice',
  LOWEST_PRICE = 'lowestPrice',
  LASTEST = 'lastest',
}

interface Props {
  value?: string;
  onChange?: Function;
  placeholder: string;
}

const Sorter: React.FC<Props> = ({ onChange, value, placeholder }: Props) => {
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
          value: SorterValues.HIGHEST_PRICE,
          label: intl.formatMessage({ id: 'filter.sorter.highestPrice' }),
        },
        {
          value: SorterValues.LOWEST_PRICE,
          label: intl.formatMessage({ id: 'filter.sorter.lowestPrice' }),
        },
        {
          value: SorterValues.LASTEST,
          label: intl.formatMessage({ id: 'filter.sorter.lastest' }),
        },
      ]}
      value={value}
      onChange={(newValue) => {
        if (onChange) {
          onChange(newValue);
        }
      }}
      className={styles.selectSorter}
      placeholder={placeholder}
    />
  );
};

export default Sorter;
