import React, { useState } from "react";
import Container from "Components/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const Celebrating = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="">
      <Container>
        <Swiper
          className="brand-slider"
          spaceBetween={20}
          navigation={{ clickable: true }}
          speed={1000}
          pagination={{ clickable: true }}
          slidesPerView={1}
          modules={[Navigation]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {data?.map(({ title, year, text }, index) => (
            <SwiperSlide key={index}>
              <div
                className={`lg:w-1/2 mx-auto bg-white p-10 lg:px-16 lg:py-32 text-center ${
                  activeIndex === index
                    ? "border-r-[6px] border-b-[6px] border-primary"
                    : ""
                }`}
              >
                <div
                  className="rb-bold text-4xl  text-primary"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <p className="rb-bold text-4xl lg:text-5xl text-font my-4">
                  {year}
                </p>

                <div
                  className="rb-light  mx-auto"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex items-center mt-secondary text-white justify-center">
          {data?.map(({ year }, index) => (
            <div
              className={`flex-1 flex items-center justify-center ${
                index === activeIndex ? "text-primary" : ""
              }`}
              key={index}
            >
              {year}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Celebrating;
