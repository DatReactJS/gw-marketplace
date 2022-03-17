import React from 'react';
import styles from './index.less';
import Statistics from './Statistics';
import Footer from '../Footer';

function Spacecraft() {
  const spacecraft1 = [20, 50, 100, 200, 300, 500],
    spacecraft2 = [20, 50, 100, 200, 300, 500];
  const listItem = (list: Array<number>) => {
    let r = list.map((item: number) => {
      return (
        <div className={styles.col} key={item}>
          <div className={styles.content}>
            <img src="/assets/images/home/IconButton11Blue_p 1.png" alt="" />
            <h4>{item}</h4>
          </div>
        </div>
      );
    });
    return r;
  };
  return (
    <>
      <div className={styles.spacecraft}>
        <div className={styles.bg}>
          <picture>
            <source
              srcSet="/assets/images/home/bgspacecraft.png"
              media="(min-width:1024px)"
            />
            <img src="/assets/images/home/bgMobileSpacecraft.png.png" alt="" />
          </picture>
        </div>
        <main>
          <aside>
            <h3 className={styles.titleH3}>bet on spacecraft#1</h3>
            <div className={styles.container}>{listItem(spacecraft1)}</div>
          </aside>
          <aside>
            <h3 className={styles.titleH3}>bet on spacecraft#2</h3>
            <div className={styles.container}>{listItem(spacecraft2)}</div>
          </aside>

          <blockquote>
            The spacecraft with less GLW bet will win.
            <br />
            With each bet of GLW, you will get 195% GLW if you win.
            <br />
            In case the bet value on 2 items are the same, you will get 95% GLW
            back
          </blockquote>

          <img
            className={styles.img}
            src="assets/images/home/Victory_Light-Line-1.webp"
            alt=""
          />

          <Statistics />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default Spacecraft;
