import myCartData from "Constant/DealerCart";
import Container from "Components/Container/Container";
import { X } from "@phosphor-icons/react";
import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ProductInfo = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Container>
      <div className="flex flex-col flex-col-reverse lg:flex-row items-center gap-y-6 gap-x-32 py-secondary lg:py-primary">
        <div className="flex-1">
          <div className="flex items-center justify-between border-b pb-4">
            <img src={myCartData?.catLogo} alt="" />
            <X />
          </div>
          <div>
            <img src={myCartData?.brandLogo} alt="" />
            <p className="my-3 text-sm rb-medium">{myCartData?.description}</p>
          </div>

          <div className="flex items-center mb-3 gap-x-2">
            <p className="text-3xl rb-light">{myCartData?.price[0]}</p>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-b">
            {myCartData.feature.map(({ image, text }, index) => (
              <div className="flex flex-col" key={index}>
                <img
                  className="w-6 h-6 lg:w-10 lg:h-10 mb-2"
                  src={image}
                  alt=""
                />
                <p className="rb-bold text-sm sm:text-base">{text}</p>
              </div>
            ))}
          </div>

          <div className="flex my-6 gap-x-3 rb-medium">
            <div className="flex-1 flex items-center gap-x-2 border">
              <p className="border-r px-4 py-3">Size</p>
              <p className="px-2">{myCartData.size}</p>
            </div>
          </div>

          <div className="flex gap-x-3">
            <div className="flex-1 rb-bold text-white flex items-center bg-dark">
              <p className="border-r px-6 py-3">Qty</p>
              <button className="flex items-center justify-between flex-1 px-10 gap-x-2">
                <p>+</p>
                <p>0</p>
                <p>-</p>
              </button>
            </div>
            <div className="flex-1">
              <button className="bg-primary text-white rb-bold w-full text-center py-3">
                Add To Cart
              </button>
            </div>
          </div>

          <button className="mt-6 uppercase underline rb-bold">
            Ask an expert
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <img className="w-full" src={myCartData.images[0]} alt="" />
        </div>
      </div>
    </Container>
  );
};

export default ProductInfo;
