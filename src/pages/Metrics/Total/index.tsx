import Button from '@/components/Button';
import Text from '@/components/Text';
import React from 'react';
import styles from './index.less';
import { useIntl } from 'umi';
import classNames from 'classnames';

interface Props {}

const Total: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  const optionsTime = {
    LAST24H: 'last24h',
    DAYS7: 'days7',
    DAYS30: 'days30',
  };

  const options = [
    {
      label: intl.formatMessage({ id: 'metrics.last24h' }),
      value: optionsTime.LAST24H,
    },
    {
      label: intl.formatMessage({ id: 'metrics.days7' }),
      value: optionsTime.DAYS7,
    },
    {
      label: intl.formatMessage({ id: 'metrics.days30' }),
      value: optionsTime.DAYS30,
    },
  ];

  const [active, setActive] = React.useState<string>(optionsTime.LAST24H);
  const handleActiveDate = (value: string) => {
    setActive(value);
  };

  return (
    <div className={styles.total}>
      <div className={styles.optionsDate}>
        {options.map((item, index: number) => {
          const isActive: boolean = active === item.value;

          return (
            <Button
              className={classNames('body-14-bold', styles.button, {
                [styles.buttonActive]: isActive,
              })}
              type={isActive ? 'primary' : 'ghost'}
              onClick={() => {
                handleActiveDate(item.value);
              }}
              key={`time-${index}`}
            >
              <Text
                type="body-14-bold"
                color={!isActive ? 'primary-100' : 'neutral-0'}
              >
                {item.label}
              </Text>
            </Button>
          );
        })}
      </div>

      <div className={styles.totalWrapper}>
        <div className={styles.totalSale}>
          <div className={styles.icon}>
            <img src="/assets/images/ic-kingdom-coin-xl.png" alt="" />
          </div>
          <div className={styles.title}>
            <Text type="body-14-bold">
              {intl.formatMessage({ id: 'metrics.totalSale' })}
            </Text>
          </div>
          <div className={styles.content}>
            <Text type="title-24-extra-bold" color="accent-500">
              50.000
            </Text>
          </div>
        </div>
        <div className={styles.totalVolume}>
          <div className={styles.icon}>
            <img src="/assets/images/ic-kingdom-coin-xl.png" alt="" />
          </div>
          <div className={styles.title}>
            <Text type="body-14-bold">
              {intl.formatMessage({ id: 'metrics.totalVolume' })}
            </Text>
          </div>
          <div className={styles.content}>
            <div className={styles.totalNumber}>
              <Text type="title-24-extra-bold" color="accent-500">
                5000
              </Text>
            </div>
            <div className={styles.iconPrice}>
              <img src="/assets/images/bnb.svg" alt="" />
            </div>
            <div className={styles.priceNumber}>
              <Text type="body-14-regular">$100.000</Text>
            </div>
          </div>
        </div>
        <div className={styles.totalSold}>
          <div className={styles.icon}>
            <img src="/assets/images/ic-kingdom-coin-xl.png" alt="" />
          </div>
          <div className={styles.title}>
            <Text type="body-14-bold">
              {intl.formatMessage({ id: 'metrics.totalSold' })}
            </Text>
          </div>
          <div className={styles.content}>
            <Text type="title-24-extra-bold" color="accent-500">
              50.000
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Total;
