import React, { useRef } from "react";
import { CaretRight, CaretLeft } from "@phosphor-icons/react";
import oilData from "Constant/OilData";
import Container from "Components/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import bg from "assests/find-your-tires-bg.jpg";
import "./style.css";
const Oil = ({ data }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <section
      style={{ backgroundImage: `url(${bg})` }}
      className="bg-lightBlue py-primary"
    >
      <Container>
        <div className="border-b border-white mb-6 pb-6">
          <h4 className="br-bold text-4xl lg:text-5xl text-white text-center">
            Essentials for your vehicle
          </h4>
        </div>
        <div className="relative ">
          <button
            ref={prevRef}
            className="absolute top-1/2 -left-10 -translate-y-1/2 z-[1000] solution-prev-button flex items-center justify-center bg-[#444] h-[72px] text-2xl text-white p-[1px] rounded-lg"
          >
            <CaretLeft />
          </button>
          <button
            ref={nextRef}
            className="absolute top-1/2 -right-10 -translate-y-1/2 z-[1000] solution-prev-button flex items-center justify-center bg-[#444] h-[72px] text-2xl text-white p-[1px] rounded-lg"
          >
            <CaretRight />
          </button>
          <Swiper
            className="oil-slider"
            spaceBetween={20}
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
            pagination={{
              clickable: true,
            }}
            slidesPerView={1}
            modules={[Pagination, Navigation, Autoplay]}
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
                slidesPerGroup: 1,
              },
            }}
          >
            {data &&
              data?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className={"flex flex-col items-center"}>
                    <img
                      className="w-full rounded-2xl"
                      src={item.image}
                      alt=""
                    />
                    <p className="text-center rb-bold text-white text-xl mt-2">
                      {item.product_id?.name}
                    </p>
                    {/* <p className="text-center text-white my-3 text-xl rb-bold">
                      {item.description}
                    </p> */}

                    <p className="text-3xl text-white">{item.product_price}$</p>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default Oil;
