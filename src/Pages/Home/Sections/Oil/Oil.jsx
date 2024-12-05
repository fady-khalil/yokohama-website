import React from "react";
import oilData from "Constant/OilData";
import Container from "Components/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import bg from "assests/find-your-tires-bg.jpg";
import "./style.css";
const Oil = () => {
  return (
    <section
      style={{ backgroundImage: `url(${bg})` }}
      className="bg-lightBlue py-primary"
    >
      <Container>
        <div>
          <h4 className="br-bold text-4xl lg:text-5xl text-white text-center mb-10">
            Essentials for your vehicle
          </h4>
        </div>

        <Swiper
          className="oil-slider"
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
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            992: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            1200: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
          }}
        >
          {oilData?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={"flex flex-col items-center"}>
                <img className="w-full" src={item.image} alt="" />
                <p className="text-center rb-bold text-white text-xl mt-2">
                  {item.name}
                </p>
                <p className="text-center text-white my-3 text-xl rb-bold">
                  {item.description}
                </p>

                <p className="text-3xl text-white">{item.price}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default Oil;
