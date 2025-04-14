import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Container from "Components/Container/Container";
import bestSellerData from "Constant/bestSellerData";
import MainButton from "Components/Buttons/MainButton";
import WhiteButton from "Components/Buttons/WhiteButton";
import bg from "assests/find-your-tires-bg.jpg";
import "./BestSeller.css";

const BestSeller = () => {
  const [selectedType, setSelectedType] = useState(bestSellerData[0].id);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // Function to check if screen is mobile size
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    // Initial check
    checkMobileView();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobileView);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  const selectedTypeHandler = (id) => {
    setSelectedType(id);
  };

  // Filter the data based on the selectedType
  const filteredData = bestSellerData.find((data) => data.id === selectedType);

  return (
    <section
      style={{ backgroundImage: `url(${bg})` }}
      className="bg-dark py-primary"
    >
      <Container>
        {/* header */}
        <div>
          <h4 className="text-center mb-10 rb-bold text-white  text-4xl xl:text-5xl">
            Best Selling
          </h4>
        </div>
        {/* tabs */}
        <div className="flex flex-col items-center justify-center pb-4 border-b">
          {/* Dropdown for small screens */}
          <div className="md:hidden w-full max-w-xs mb-4">
            <select
              className="w-full p-2 bg-dark text-primary border border-primary rounded"
              value={selectedType}
              onChange={(e) => selectedTypeHandler(parseInt(e.target.value))}
            >
              {bestSellerData.map(({ id, cat }) => (
                <option key={id} value={id}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons for medium and large screens */}
          <div className="hidden md:flex items-center justify-center gap-x-10">
            {bestSellerData.map(({ id, cat }) => (
              <button
                className="text-primary uppercase"
                onClick={() => selectedTypeHandler(id)}
                key={id}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {/* sluder */}
        <Swiper
          className="brand-slider mt-10"
          spaceBetween={40}
          navigation={!isMobileView ? { clickable: false } : false}
          speed={1000}
          pagination={{
            clickable: true,
            bulletActiveClass: "swiper-pagination-bullet-active-primary",
            bulletClass: "swiper-pagination-bullet-primary",
          }}
          slidesPerView={1}
          modules={[Pagination, Navigation]}
          breakpoints={{
            768: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            992: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
          }}
        >
          {filteredData?.products.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="product-container   items-center py-primary relative">
                <div className=" flex flex-col justify-center relative z-[10] border-b-[4px] border-[#333]">
                  <p className="text-primary text-lg rb-medium">
                    {product.type}
                  </p>
                  <p className="text-white text-2xl rb-medium">
                    {product.name}
                  </p>
                  <p className="rb-light text-2xl text-white mt-2">
                    {product.price}
                  </p>
                  <p className="text-[#555] rb-bold">{product.carType}</p>
                </div>
                <div className="flex items-center justify-end ">
                  <img
                    className="scale-[2]  "
                    src={product.image}
                    alt={product.name}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* <div className="flex flex-col md:flex-row md:items-center gap-6 pt-secondary md:justify-center lg:w-1/2 mx-auto">
          <MainButton to={"/shop"}>Shop All Products</MainButton>
          <WhiteButton>Find Your Perfect Tires</WhiteButton>
        </div> */}
      </Container>
    </section>
  );
};

export default BestSeller;
