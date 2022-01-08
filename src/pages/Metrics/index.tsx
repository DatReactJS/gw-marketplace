import Button from '@/components/Button';
import Paginator from '@/components/Paginator';
import Tabs, { TabsEnum } from '@/components/Tabs';
import Text from '@/components/Text';
import React from 'react';
import styles from './index.less';

interface Props {}

const Metrics: React.FC<Props> = (props: Props) => {
  const handleChangeTab = (tab: TabsEnum) => {
    console.log('🚀 ~ tab', tab);
  };

  const onPage = (pape: number) => {
    console.log('🚀 ~ pape', pape);
  };

  return (
    <div className={styles.metrics}>
      <Text type="caption-12-light">Caption 12 - Light</Text>
      <Text type="caption-12-regular">Caption 12 - regular</Text>
      <Text type="caption-12-semi-bold">Caption 12 - semibold</Text>
      <Text type="caption-12-bold">Caption 12 - bold</Text>
      <Text type="body-14-regular">body 14 - regular</Text>
      <Text type="body-14-semi-bold">body 14 - semi-bold</Text>
      <Text type="body-14-bold">body 14 - bold</Text>
      <Text type="body-16-regular">body 16 - regular</Text>
      <Text type="body-16-semi-bold">body 16 - semi-bold</Text>
      <Text type="body-16-bold">body 16 - bold</Text>
      <Text type="headline-20-semi-bold">Headline 20 - Semibold</Text>
      <Text type="headline-20-bold">Headline 20 - bold</Text>
      <Text type="headline-20-extra-bold">Headline 20 - Extrabold</Text>
      <Text type="title-24-semi-bold">Title 24 - Semibold</Text>
      <Text type="title-24-bold">Title 24 - bold</Text>
      <Text type="title-24-extra-bold">Title 24 - Extrabold</Text>
      <Text type="title-30-semi-bold">Title 30 - semibold</Text>
      <Text type="title-30-bold">Title 30 - bold</Text>

      <Button className={styles.button}>Button</Button>
      <Button className={styles.button} type="outline">
        Button
      </Button>
      <Button className={styles.button} type="ghost">
        Button
      </Button>

      <Tabs onChange={handleChangeTab} />

      <Paginator currentPage={1} totalPages={100} onPage={onPage} />
    </div>
  );
};

export default Metrics;
