import Select, { Option } from 'rc-select';
import cls from 'classnames';
import './index.less';
import React from 'react';
import Icon from '../Icon';
import { NEUTRAL, PRIMARY } from '@/utils/constants/colors';
import Text from '@/components/Text';

export interface OptionSelect {
  value: string | number;
  label: string;
  prefix?: React.ReactNode | string;
  suffix?: React.ReactNode | string;
  icon?: React.ReactNode;
  isComming?: boolean;
}
interface SelectProps {
  defaultValue?: string | number | undefined;
  options?: OptionSelect[];
  className?: string;
  placeholder?: string;
  classNameDropdown?: string;
  icon?: string;
  open?: boolean;
  value?: string | number | undefined;
  iconLabel?: React.ReactNode;
  onChange?: (value: string | number, option?: any) => void;
}

const RCSelect: React.FC<SelectProps> = (props: SelectProps) => {
  const {
    options = [],
    className,
    classNameDropdown,
    icon,
    onChange,
    defaultValue,
    placeholder,
    iconLabel,
    ...rest
  } = props;

  return (
    <div className="checkbox-container">
      <Select
        className={cls(['rcselect', className])}
        dropdownClassName={cls(['menu', classNameDropdown])}
        defaultValue={defaultValue}
        onChange={onChange}
        {...rest}
      >
        {options.map(
          (
            { label, value, prefix, suffix, icon, isComming }: OptionSelect,
            index: number,
          ) => {
            return (
              <Option
                value={value}
                key={`${label}-${value}-${index}`}
                className={isComming ? 'disable' : ''}
              >
                {icon}
                {prefix}
                {label}
                {suffix}
              </Option>
            );
          },
        )}
      </Select>

      {iconLabel && <div className="iconLabel">{iconLabel}</div>}
      {placeholder && (
        <Text
          type="body-18-regular"
          color="primary-250"
          className={iconLabel ? 'placeholderActive' : 'placeholder'}
        >
          {placeholder}
        </Text>
      )}

      <img alt="arrow" src="/assets/images/marketplace/arrow.png" />
    </div>
  );
};

export default RCSelect;
