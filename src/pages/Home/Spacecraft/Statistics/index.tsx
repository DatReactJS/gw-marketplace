import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import styles from './index.less';
function Statistics() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      direction="vertical"
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <div className={styles.statistic}>
          <h4>players</h4>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Statistics;
