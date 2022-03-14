import React from 'react';
import styles from './index.less';
import HeroCard from '../HeroCard';

interface Props {}

const Spacecraft: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContainerFlex}>
        {new Array(24).fill(undefined).map((_, index: number) => {
          return (
            <div className={styles.heroCard} key={`hero-card-${index}`}>
              <HeroCard />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Spacecraft;
