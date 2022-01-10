import Loading from '@/components/Loading';
import { useRequest } from '@umijs/hooks';
import classNames from 'classnames';
import React from 'react';
import Image from './Image';
import styles from './index.less';
import Info from './Info';

interface Props {}

const Detail: React.FC<Props> = (props: Props) => {
  const { loading, data, refresh } = useRequest(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 500);
    });
  });

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }

    if (data && !loading) {
      return (
        <>
          <Image />
          <Info refresh={refresh} />
        </>
      );
    }

    /**
     * TODO: Return error page or null
     */

    return null;
  };

  return (
    <div
      className={classNames(styles.detail, {
        [styles.loading]: loading,
      })}
    >
      {renderContent()}
    </div>
  );
};

export default Detail;
