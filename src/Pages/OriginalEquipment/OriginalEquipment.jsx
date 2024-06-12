import { useState, useRef } from "react";
import bg from "assests/about/channels/bg.jpg";
import Container from "Components/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import data from "Constant/OriginalEquipment";
import "./style.css";

const OriginalEquipment = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedContent, setSelectedContent] = useState(data[0]?.content);
  const contentRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    setSelectedContent(data[swiper.activeIndex]?.content);
  };

  const handleClick = (index, id) => {
    setActiveIndex(id);
    setSelectedContent(data[index]?.content);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section style={{ backgroundImage: `url(${bg})` }}>
      <Container>
        <div className="py-40">
          <div className="mb-24">
            <h2 className="text-3xl rb-bold text-center text-white">
              Original Equipment
            </h2>
          </div>

          <Swiper
            className="original-slider"
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
            onSlideChange={handleSlideChange}
          >
            {data?.map(({ image, id }, index) => (
              <SwiperSlide key={index}>
                <button
                  onClick={() => handleClick(index, id)}
                  className={`flex items-center justify-center ${
                    activeIndex === id ? "border-4 border-primary" : ""
                  }`}
                >
                  <img className="" src={image} alt="" />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          {selectedContent && (
            <div
              ref={contentRef}
              className="flex flex-col lg:flex-row pt-14 items-stretch gap-y-10 gap-x-20 "
            >
              <div className="flex-1 text-white relative pb-6 lg:pb-0 border-b-4 border-primary flex flex-col justify-center min-h-full">
                <h3 className="text-3xl rb-bold">{selectedContent.title}</h3>
                <p className="mt-4">{selectedContent.text}</p>
              </div>
              <div className="flex-1">
                <img
                  src={selectedContent.image}
                  alt={selectedContent.title}
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default OriginalEquipment;
