// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowRight, ArrowLeft } from "@phosphor-icons/react";

// UI
// Import Swiper styles
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "./style.css";

// import required modules
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";

import image1 from "assests/Hero/1.png";
import image2 from "assests/Hero/2.png";
import image3 from "assests/Hero/3.png";
import image4 from "assests/Hero/4.png";
import image5 from "assests/Hero/5.png";
import image6 from "assests/Hero/6.png";

const Slider = () => {
  const data = [image1, image2, image3, image4, image5, image6];
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="w-full h-full">
      <div className="flex items-center gap-x-1">
        <button
          ref={prevRef}
          className="absolute top-1/2 left-10 -translate-y-1/2 z-[1000] solution-prev-button flex items-center justify-center bg-black text-3xl text-white p-1"
        >
          <ArrowLeft />
        </button>
        <button
          ref={nextRef}
          className="absolute top-1/2 right-10 -translate-y-1/2 z-[1000] solution-next-button flex items-center justify-center bg-black text-3xl text-white p-1"
        >
          <ArrowRight />
        </button>
      </div>
      <Swiper
        navigation={{
          clickable: true,
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        speed={1000}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        className="heroSlider"
      >
        {data?.map((image, indx) => (
          <SwiperSlide key={indx} className="h-full">
            <div className={` h-full w-full`}>
              <img src={image} className="w-full object-cover h-full" alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      )
    </section>
  );
};

export default Slider;
