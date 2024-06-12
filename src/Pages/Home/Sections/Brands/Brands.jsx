import React from "react";
import Container from "Components/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "./style.css";
import brand1 from "assests/brand-1.png";
import brand2 from "assests/brand-2.png";
import brand3 from "assests/brand-3.png";
const Brands = ({ noSpace }) => {
  const images = [
    brand1,
    brand2,
    brand3,
    brand1,
    brand2,
    brand3,
    brand1,
    brand2,
    brand3,
  ];
  return (
    <section
      className={`${noSpace ? "mt-mega" : "pt-mega bg-dark pb-primary"}  `}
    >
      <Container>
        <div>
          <h1 className="text-center text-white rb-bold text-5xl mb-10">
            Our Brands
          </h1>
        </div>
        <Swiper
          className="brand-slider"
          spaceBetween={20}
          navigation={{
            clickable: true,
          }}
          speed={1000}
          pagination={{
            clickable: true,
          }}
          slidesPerView={1}
          modules={[Pagination, Navigation]}
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
              slidesPerGroup: 4,
            },
          }}
        >
          {images?.map((image, index) => (
            <SwiperSlide key={index}>
              <div className={""}>
                <img className="" src={image} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default Brands;
