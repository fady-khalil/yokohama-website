import React from "react";
import oilData from "Constant/OilData";
import Container from "Components/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
const Shop = () => {
  return (
    <section className="bg-lightBlue py-primary">
      <Container>
        <div>
          <h4 className="br-bold text-5xl text-center mb-10">Special Offers</h4>
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
          {oilData?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={"flex flex-col items-center"}>
                <img className="w-full" src={item.image} alt="" />
                <p className="text-center rb-bold text-primary text-xl mt-2">
                  {item.name}
                </p>
                <p className="text-center my-3 text-2xl rb-bold">
                  {item.description}
                </p>

                <p className="text-3xl text-primary">{item.price}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default Shop;
