import Container from "Components/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
const OurClients = ({ data }) => {
  console.log("Our Clients Data:", data);
  return (
    <section className="py-primary">
      <Container>
        <div className="mb-14">
          <h2 className="text-2xl lg:text-4xl xxl:text-5xl rb-bold text-center">
            Clients that Rely on Us
          </h2>

          <p className="text-center lg:w-1/2 mx-auto mt-4">
            We proudly serve over 100 fleet companies, including local,
            international industry leaders Government sectors, Schools, and
            International NGOs.
          </p>
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
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
          }}
        >
          {data?.map((image, index) => (
            <SwiperSlide key={index}>
              <div className={"w-3/4 flex items-center justify-center mx-auto"}>
                <img className="" src={image?.logo_url} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default OurClients;
