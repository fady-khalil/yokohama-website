import React from "react";
import Container from "Components/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "./style.css";
import brand1 from "assests/brand/1.png";
import brand2 from "assests/brand/2.png";
import brand3 from "assests/brand/3.png";
import brand4 from "assests/brand/4.png";
import brand5 from "assests/brand/5.png";
import brand6 from "assests/brand/6.png";
import brand7 from "assests/brand/7.png";

const Brands = ({ noSpace }) => {
  const images = [brand1, brand2, brand3, brand4, brand5, brand6, brand7];
  return (
    <section
      className={`${noSpace ? "mt-mega" : "pt-mega bg-dark pb-primary"}  `}
    >
      <Container>
        <Swiper
          className="brand-slider"
          spaceBetween={20}
          navigation={{
            clickable: true,
          }}
          speed={1000}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          slidesPerView={1}
          modules={[Pagination, Navigation, Autoplay]}
          breakpoints={{
            578: {
              slidesPerView: 3,
              slidesPerGroup: 4,
            },
            992: {
              slidesPerView: 5,
              slidesPerGroup: 6,
            },
            1200: {
              slidesPerView: 4,
              slidesPerGroup: 1,
            },
          }}
        >
          {images?.map((image, index) => (
            <SwiperSlide key={index}>
              <div className={"w-3/4"}>
                <img className="w-full object-contain" src={image} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default Brands;
