import React from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

interface Props {
  children: React.ReactElement;
  overlayClassName?: string;
  placement?:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight';
  title: string | React.ReactNode;
}

const RCTooltip: React.FC<Props> = ({
  children,
  placement = 'top',
  title,
  ...rest
}: Props) => {
  return (
    <Tooltip
      placement={placement}
      overlay={<div className="tooltip-overlay">{title}</div>}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

export default RCTooltip;
