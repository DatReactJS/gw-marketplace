import React from 'react';
import Checkbox from 'rc-checkbox';
import styles from './index.less';
import './index.less';
import classNames from 'classnames';
import 'rc-checkbox/assets/index.css';
interface CheckBoxProps {
  children?: React.ReactNode;
  className?: string;
  label?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: any;
  tickAccent?: boolean;
}

interface Ref {
  ref?: React.Ref<HTMLInputElement>;
}

const RcCheckBox: React.FC<CheckBoxProps & Ref> = React.forwardRef(
  (props: CheckBoxProps, ref: Ref['ref']) => {
    const {
      className,
      label,
      disabled = false,
      children,
      checked,
      onChange,
      tickAccent = false,
      ...rest
    } = props;

    const checkboxRef = (ref as any) || React.createRef<HTMLInputElement>();

    const classes: string = classNames([styles.default, className]);

    return (
      <div className={classes}>
        <div className="checkbox">
          <Checkbox
            ref={checkboxRef}
            disabled={disabled}
            onChange={onChange}
            checked={checked}
            {...rest}
          />
          {checked ? (
            <img alt="" src="/assets/images/marketplace/ic-checked.png" />
          ) : (
            <img alt="" src="/assets/images/marketplace/ic-checkbox.png" />
          )}
        </div>

        {children}
      </div>
    );
  },
);

export default RcCheckBox;
