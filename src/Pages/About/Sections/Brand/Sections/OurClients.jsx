import Container from "Components/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
const OurClients = ({ data }) => {
  return (
    <section className="py-primary">
      <Container>
        <div className="mb-14">
          <h2 className="text-3xl rb-bold text-center">Our Client</h2>
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
          slidesPerView={2}
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
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
          }}
        >
          {data?.map((image, index) => (
            <SwiperSlide key={index}>
              <div className={"w-3/4 flex items-center justify-center"}>
                <img className="" src={image} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default OurClients;
