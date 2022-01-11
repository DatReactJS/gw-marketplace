import Select, { Option } from 'rc-select';
import cls from 'classnames';
import './index.less';
import { useBoolean } from '@umijs/hooks';
import React from 'react';
import Icon from '../Icon';
import { NEUTRAL, PRIMARY } from '@/utils/constants/colors';

export interface OptionSelect {
  value: string | number;
  label: string;
  prefix?: React.ReactNode | string;
  suffix?: React.ReactNode | string;
}
interface SelectProps {
  options?: OptionSelect[];
  className?: string;
  placeholder?: string;
  classNameDropdown?: string;
  icon?: string;
  open?: boolean;
  value?: string | number | undefined;
  onChange?: (value: string | number, option?: any) => void;
}

const RCSelect: React.FC<SelectProps> = (props: SelectProps) => {
  const { options = [], className, classNameDropdown, icon, ...rest } = props;

  const { setTrue } = useBoolean(false);

  return (
    <div className="checkbox-container">
      <Select
        className={cls(['rcselect', className])}
        dropdownClassName={cls(['menu', classNameDropdown])}
        onClick={setTrue}
        {...rest}
      >
        {options.map(
          ({ label, value, prefix, suffix }: OptionSelect, index: number) => {
            return (
              <Option value={value} key={`${label}-${value}-${index}`}>
                {prefix}
                {label}
                {suffix}
              </Option>
            );
          },
        )}
      </Select>
      <Icon
        icon="chevron_down"
        color={props?.value ? NEUTRAL.NEUTRAL_0 : PRIMARY.PRIMARY_100}
        size={25}
      />
    </div>
  );
};

export default RCSelect;
