import React from 'react';
import IcoMoon from 'react-icomoon';
const iconSet = require('./selection.json');

interface Props {
  icon: string;
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
  [name: string]: any;
}

const Icon: React.FC<Props> = (props: Props) => {
  return <IcoMoon iconSet={iconSet} {...props} />;
};

export default Icon;
