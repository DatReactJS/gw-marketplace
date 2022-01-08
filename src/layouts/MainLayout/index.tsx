import React from 'react';
import Navbar from '@/components/Navbar';
import { RecoilRoot } from 'recoil';
import { useProvider } from '@/utils/hooks/connect';
import { useBNB } from '@/utils/hooks/bnb';
import { useLocation } from 'umi';
import styles from './index.less';
import 'react-toastify/dist/ReactToastify.css';
import 'rc-slider/assets/index.css';
import '@/global/theme.less';
import classNames from 'classnames';
import { ToastContainer, Zoom } from 'react-toastify';
import { useConfig } from '@/utils/hooks/config';
import Loading from '@/components/Loading';

interface Props {
  children: React.ReactNode;
}

const Provider: React.FC<Props> = ({ children }: Props) => {
  const { loading } = useConfig();
  const { pathname } = useLocation();

  useProvider();
  useBNB();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  if (loading) {
    return (
      <div className={styles.main}>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Zoom}
      />
      <Navbar />
      <div className={classNames(styles.main)}>{children}</div>
    </>
  );
};

const MainLayout: React.FC<Props> = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <Provider>{children}</Provider>
    </RecoilRoot>
  );
};

export default MainLayout;
