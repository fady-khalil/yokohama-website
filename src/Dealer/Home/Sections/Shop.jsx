import { useContext, useEffect, useState } from "react";
import oilData from "Constant/OilData";
import Container from "Components/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

import { DealerLoginContext } from "context/Auth/DealerContext";
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
const Shop = () => {
  const { dealerToken } = useContext(DealerLoginContext);
  const { fetchData } = useGetDataToken();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState();
  const getSpecialOfferData = async () => {
    try {
      const data = await fetchData(
        "yokohama/dealer/special_offer",
        dealerToken
      );
      setProducts(data?.data);
      console.log(data);
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    getSpecialOfferData();
  }, []);
  return (
    <section className="bg-lightBlue py-primary">
      <Container>
        <div>
          <h4 className="br-bold text-5xl text-center mb-10">Special Offers</h4>
        </div>

        <Swiper
          className="oil-slider"
          spaceBetween={30}
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
          {products?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={"flex flex-col items-center "}>
                <img className="w-full h-[250px]" src={item.image} alt="" />
                <p className="text-center rb-bold text-black text-lg mt-2  max-w-full break-words overflow-wrap ">
                  {item.name}
                </p>

                <p className="text-lg text-primary mt-6 font-bold">
                  {item.price} {item.currency}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default Shop;
