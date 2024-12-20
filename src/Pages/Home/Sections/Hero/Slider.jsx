// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { CaretRight, CaretLeft } from "@phosphor-icons/react";

// UI
// Import Swiper styles
import React, { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "./style.css";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

import image1 from "assests/Hero/1.webp";
import image2 from "assests/Hero/2.webp";
import image3 from "assests/Hero/3.webp";
import image4 from "assests/Hero/4.webp";
import image5 from "assests/Hero/5.webp";
import image6 from "assests/Hero/6.webp";

const Slider = () => {
  const data = [image1, image2, image3, image4, image5, image6];
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="w-full h-full pt-10">
      <div className="flex items-center gap-x-1">
        <button
          ref={prevRef}
          className="absolute top-1/2 left-10 -translate-y-1/2 z-[1000] solution-prev-button flex items-center justify-center bg-[#444] h-[72px] text-2xl text-white p-[1px] rounded-lg"
        >
          <CaretLeft />
        </button>
        <button
          ref={nextRef}
          className="absolute top-1/2 right-10 -translate-y-1/2 z-[1000] solution-prev-button flex items-center justify-center bg-[#444] h-[72px] text-2xl text-white p-[1px] rounded-lg"
        >
          <CaretRight />
        </button>
      </div>
      <Swiper
        spaceBetween={30}
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
        className="heroSlider rounded-2xl"
      >
        {data?.map((image, indx) => (
          <SwiperSlide key={indx} className="h-full  rounded-2xl">
            <div className={` h-full w-full  rounded-2xl`}>
              <img src={image} className="w-full  h-full rounded-2xl" alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      )
    </section>
  );
};

export default Slider;
