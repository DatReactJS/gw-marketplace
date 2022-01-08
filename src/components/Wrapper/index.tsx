import { useIsConnected } from '@/utils/hooks/connect/wallet';
import React from 'react';
import { history, useRouteMatch } from 'umi';

interface Props {
  children: React.ReactElement;
}

const Wrapper: React.FC<Props> = ({ children }: Props) => {
  const isConnected: boolean = useIsConnected();
  const isMatchLogin: boolean = !!useRouteMatch('/login');
  const isMatchAccount: boolean = !!useRouteMatch('/account');

  const isLoggedIn: boolean = isConnected && isMatchLogin;
  const isAccessAccount: boolean = !isConnected && isMatchAccount;

  if (isLoggedIn || isAccessAccount) {
    history.push('/');
    return null;
  }

  return children;
};

export default Wrapper;
