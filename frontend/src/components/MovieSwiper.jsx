import React from "react";
import "../index.css";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Autoplay, EffectCoverflow } from "swiper/modules";

function MovieSwiper({ slides, slideChange }) {
    
  return (
    <Swiper
      
      grabCursor={false}
      centeredSlides={true}
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      loop={true}
      modules={[Autoplay, EffectCoverflow]}
      preloadImages={false}
      className="movieSwiper"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide._id}>
          <img
            src={slide.previewImg}
            alt="Preview"
            onClick={() => slideChange(slide._id)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MovieSwiper;
