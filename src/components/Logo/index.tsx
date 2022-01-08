import React from 'react';
import { history } from 'umi';
import './logo.less';

interface Props {
  type: string;
}

const Logo: React.FC<Props> = ({ type }: Props) => {
  const level: string = `logo_${type}`;

  const handleClickLogo = () => {
    console.log('🚀 ~ handleClickLogo');
    history.push('/');
  };

  return (
    <img
      className={level}
      src="/assets/images/logo.png"
      alt="Battlelands"
      onClick={handleClickLogo}
    />
  );
};

export default Logo;
