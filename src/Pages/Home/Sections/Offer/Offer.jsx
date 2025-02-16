import { useRef } from "react";
import Container from "Components/Container/Container";
import bg from "assests/find-your-tires-bg.jpg";
import MainButton from "Components/Buttons/MainButton";
// Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowRight, ArrowLeft } from "@phosphor-icons/react";

const Offer = ({ data }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <section
      style={{ backgroundImage: `url(${bg})` }}
      className="py-secondary bg-dark"
    >
      <Container>
        <div className="pb-6 mb-6 border-b border-white flex items-center justify-center gap-x-10">
          <button
            ref={prevRef}
            className="slider-arrow z-[100]  flex items-center justify-center bg-primary text-2xl text-white p-2 rounded-md"
          >
            <ArrowLeft />
          </button>

          <h1 className="text-center rb-bold text-white text-5xl">
            Special Offer
          </h1>
          <button
            ref={nextRef}
            className="slider-arrow z-[100]  flex items-center justify-center bg-primary text-2xl text-white p-2 rounded-md"
          >
            <ArrowRight />
          </button>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            clickable: true,
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="offer-slider"
        >
          {data?.map((offer) => (
            <SwiperSlide key={offer.id}>
              <div className="flex flex-col lg:flex-row items-center">
                <div className="flex-1">
                  <img
                    className="w-full h-[600px] object-cover rounded-2xl"
                    src={offer.image}
                    alt={offer.title}
                  />
                </div>
                <div className="flex-1 py-8 lg:py-0">
                  <Container>
                    <p className="text-5xl rb-bold text-primary">
                      {offer?.title}
                    </p>
                    <h6 className="text-white rb-bold text-4xl">
                      {offer.sub_title}
                    </h6>
                    <p className="text-white mb-14 mt-2">{offer.description}</p>
                    <MainButton to={`/product-detailed/${offer.product_id.id}`}>
                      Buy Now
                    </MainButton>
                  </Container>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default Offer;
