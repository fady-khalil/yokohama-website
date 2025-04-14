import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { CaretRight, CaretLeft } from "@phosphor-icons/react";
import "./style.css";
import image9 from "assests/details/9.jpg";
import image10 from "assests/details/10.jpg";
import Container from "Components/Container/Container";
const ProductGallery = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const data = [image9, image10, image9, image10];
  return (
    <div className="border-t pt-primary bg-[#efefef]">
      <Container>
        <Swiper
          className="cat-slider"
          spaceBetween={14}
          speed={1000}
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            578: {
              slidesPerView: 2,
              slidesPerGroup: 4,
            },
            992: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
          }}
          onBeforeInit={(swiper) => {
            // To avoid 'undefined' issue when initializing
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
        >
          {data?.map((image, index) => (
            <SwiperSlide className={``} key={index}>
              <img src={image} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center gap-x-6 relative z-[1000] justify-center py-10">
          <button ref={nextRef} className="custom-prev-button text-xl">
            <CaretRight weight="bold" />
          </button>
          <button ref={prevRef} className="custom-next-button text-xl">
            <CaretLeft weight="bold" />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default ProductGallery;
