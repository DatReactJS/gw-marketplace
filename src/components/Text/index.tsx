import classNames from 'classnames';
import React from 'react';

export interface TextProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type:
    | 'caption-12-light'
    | 'caption-12-regular'
    | 'caption-12-semi-bold'
    | 'caption-12-bold'
    | 'body-14-regular'
    | 'body-14-semi-bold'
    | 'body-14-bold'
    | 'body-16-regular'
    | 'body-16-semi-bold'
    | 'body-16-bold'
    | 'body-18-regular'
    | 'body-18-semi-bold'
    | 'body-18-bold'
    | 'headline-20-semi-bold'
    | 'headline-20-bold'
    | 'headline-20-extra-bold'
    | 'title-24-semi-bold'
    | 'title-24-bold'
    | 'title-24-extra-bold'
    | 'title-30-bold'
    | 'title-30-semi-bold';
  color?:
    | 'primary-500'
    | 'primary-400'
    | 'primary-300'
    | 'primary-200'
    | 'primary-100'
    | 'neutral-0'
    | 'accent-600'
    | 'accent-500'
    | 'warning'
    | 'success'
    | 'info';
}

const Text: React.FC<TextProps> = (props: TextProps) => {
  const {
    children,
    className,
    type,
    color = 'neutral-0',
    disabled = false,
    onClick,
    ...rest
  }: TextProps = props;

  const prefixCls: string = 'text';

  const classes: string = classNames(
    type,
    {
      [`${color.toLowerCase()}`]: color,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-click`]: !!onClick,
    },
    className,
  );

  const handleClick = () => {
    if (disabled) {
      return;
    }

    onClick && onClick();
  };

  return (
    <span className={classes} onClick={handleClick} {...rest}>
      {children}
    </span>
  );
};

export default Text;
