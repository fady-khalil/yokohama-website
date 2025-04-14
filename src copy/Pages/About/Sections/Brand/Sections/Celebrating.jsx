import React, { useState, useRef, useEffect } from "react";
import Container from "Components/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import bg from "assests/about/Brand/bg3.jpg";

const Celebrating = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  // Function to handle year click
  const handleYearClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  // Adding CSS to remove navigation button background on hover
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement("style");

    // Define CSS rules to remove background on hover
    styleElement.textContent = `
      .swiper-button-next:hover,
      .swiper-button-prev:hover {
        background: transparent !important;
      }
    `;

    // Append the style element to the document head
    document.head.appendChild(styleElement);

    // Clean up on component unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="background py-mega"
    >
      <Container>
        <h2 className="text-2xl lg:text-4xl xxl:text-5xl rb-bold text-center text-white mb-10">
          Our Milestones Through the Years
        </h2>
        <Swiper
          ref={swiperRef}
          className="brand-slider equal-height-slides"
          spaceBetween={20}
          navigation={{ clickable: true }}
          speed={1000}
          pagination={{ clickable: true }}
          slidesPerView={1}
          modules={[Navigation, Pagination]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          // Added for equal height slides
          observer={true}
          observeParents={true}
          style={{
            "--swiper-wrapper-transition-timing-function": "linear",
            "--swiper-navigation-color": "var(--primary-color, #F20505)",
            "--swiper-navigation-size": "25px",
            "--swiper-pagination-color": "var(--primary-color, #F20505)",
          }}
          onSwiper={(swiper) => {
            // Store swiper instance in ref for future use
            swiperRef.current = { swiper };
          }}
          onInit={(swiper) => {
            // Wait until everything is rendered
            setTimeout(() => {
              if (swiper && swiper.el) {
                swiper.updateSize();
                swiper.updateSlides();
                swiper.update();
              }
            }, 300);
          }}
          onResize={(swiper) => {
            if (swiper && swiper.el) {
              swiper.updateSize();
              swiper.updateSlides();
            }
          }}
        >
          {data?.map(({ title, year, text }, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div
                className={`lg:w-1/2 mx-auto bg-white p-10 lg:px-16 lg:py-32 text-center h-full flex flex-col ${
                  activeIndex === index
                    ? "border-r-[6px] border-b-[6px] border-primary"
                    : ""
                }`}
              >
                <div
                  className="rb-bold text-4xl text-primary"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <p className="rb-bold text-4xl lg:text-5xl text-font my-4">
                  {year}
                </p>

                <div
                  className="rb-light mx-auto flex-grow"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex items-center lg:mt-secondary text-white justify-center overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
          <div className="flex min-w-full sm:min-w-0 sm:w-full">
            {data?.map(({ year }, index) => (
              <div
                className={`px-3 sm:px-0 sm:flex-1 whitespace-nowrap flex items-center justify-center ${
                  index === activeIndex ? "text-primary font-bold" : ""
                } cursor-pointer hover:opacity-80 transition-opacity`}
                key={index}
                onClick={() => handleYearClick(index)}
              >
                {year}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Celebrating;
