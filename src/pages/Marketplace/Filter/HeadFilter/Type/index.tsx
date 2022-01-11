import Select from '@/components/Select';
import { useIntl } from 'umi';
import styles from './index.less';

export enum TypeValues {
  ALL = 'all',
  FOR_SALE = 'forSale',
  NOT_FOR_SALE = 'notForSale',
}

interface Props {
  value?: string;
  onChange?: Function;
  placeholder: string;
}

const Type: React.FC<Props> = ({ onChange, value, placeholder }: Props) => {
  const intl = useIntl();

  return (
    <Select
      options={[
        {
          value: TypeValues.ALL,
          label: intl.formatMessage({ id: 'filter.type.all' }),
        },
        {
          value: TypeValues.FOR_SALE,
          label: intl.formatMessage({ id: 'filter.type.forSale' }),
        },
        {
          value: TypeValues.NOT_FOR_SALE,
          label: intl.formatMessage({ id: 'filter.type.notForSale' }),
        },
      ]}
      value={value}
      onChange={(newValue) => {
        if (onChange) {
          onChange(newValue);
        }
      }}
      className={styles.selectType}
      placeholder={placeholder}
      classNameDropdown={styles.dropdownType}
    />
  );
};

export default Type;
