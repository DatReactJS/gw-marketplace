import { TabsEnum } from '@/components/Tabs';
import Text from '@/components/Text';
import classNames from 'classnames';
import React from 'react';
import { history, useIntl, useLocation } from 'umi';
import styles from './index.less';

interface Props {}
interface InfoProfuct {
  img: string;
  title: string;
  value: any;
}

const CardCharacters: React.FC<Props> = (props: Props) => {
  const location: any = useLocation();
  const intl = useIntl();

  const heroType: string = location.query?.tab || TabsEnum.CHARACTER;

  const infoProduct: InfoProfuct[] = [
    {
      img: '/assets/images/marketplace/ic-power.png',
      title: 'power',
      value: 10,
    },
    {
      img: '/assets/images/marketplace/ic-level.png',
      title: 'level',
      value: 10,
    },
    {
      img: '/assets/images/marketplace/ic-exp.png',
      title: 'exp',
      value: 10,
    },

    {
      img: '/assets/images/marketplace/ic-speed.png',
      title: 'speed',
      value: 10,
    },
  ];

  return (
    <div
      className={classNames(styles.Card, {
        [styles.common]: false,
        [styles.rare]: false,
        [styles.epic]: false,
        [styles.legendary]: true,
      })}
    >
      <div className={styles.CardCharacters}>
        <div className={styles.header}>
          <Text type="body-14-bold" color="neutral-0" font="font-Michroma">
            team alpha
          </Text>
          <Text type="body-14-semi-bold" color="blue">
            ID#6931
          </Text>
        </div>
        <div className={styles.content}>
          <div className={styles.commen}>
            <img alt="" src="/assets/images/marketplace/card-common.png" />
            <Text type="body-14-semi-bold" color="neutral-0">
              COMMON
            </Text>
          </div>
          <div className={styles.imgProduct}>
            <img
              alt=""
              src="/assets/images/marketplace/product_Character.png"
            />
          </div>
          <div className={styles.infoProduct}>
            {infoProduct.map((item, index) => {
              return (
                <div
                  className={styles.flexItem}
                  key={`card-spacecraft${index}`}
                >
                  <div className={styles.flex}>
                    <img alt="img-card" src={item.img} />
                    <Text type="body-14-regular" color="blue">
                      {`${item.title}:`}
                    </Text>
                  </div>
                  <Text type="body-14-regular" color="neutral-0">
                    {item.value}
                  </Text>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.btn}>
            <Text type="body-14-bold" font="font-Michroma">
              buy now
            </Text>
            <div className={styles.flex}>
              <Text type="body-14-semi-bold" color="neutral-0">
                ????
              </Text>
              <img
                alt="img-card"
                src="/assets/images/marketplace/ic-coid.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCharacters;
