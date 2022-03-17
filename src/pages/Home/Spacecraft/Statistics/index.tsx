import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/navigation';
import styles from './index.less';
SwiperCore.use([Navigation]);
function Statistics() {
  const navigationPrevRef = React.useRef(null);
  const Item = () => {
    return (
      <>
        <div className={styles.statistic}>
          <img
            src="/assets/images/home/Frame.png"
            alt=""
            className={styles.activeSign}
          />
          <h3>263,731</h3>
          <div className={styles.cotainer}>
            <h4>players</h4>
            <img src="/assets/images/home/PanelTitle_StoreItem 1.png" alt="" />
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <h3 className={styles.title}>statistics</h3>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        direction="horizontal"
        effect="flip"
        className={styles.swiper}
        navigation={{
          nextEl: `.${styles.swiper_button_next}`,
          prevEl: `.${styles.swiper_button_prev}`,
        }}
      >
        <SwiperSlide>
          <Item />
        </SwiperSlide>
        <SwiperSlide>
          <Item />
        </SwiperSlide>
        <SwiperSlide>
          <Item />
        </SwiperSlide>

        <button className={styles.swiper_button_next}>
          <img src="/assets/images/home/Btn_Previous1_p 2.png" alt="" />
        </button>

        <button className={styles.swiper_button_prev}>
          <img src="/assets/images/home/Btn_Previous1_p 1.png" alt="" />
        </button>
      </Swiper>
    </>
  );
}

export default Statistics;
