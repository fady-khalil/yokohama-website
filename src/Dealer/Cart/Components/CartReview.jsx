import React from "react";
import Container from "Components/Container/Container";
import brand1 from "assests/brand-cart.jpg";
import { Trash } from "@phosphor-icons/react";
import MainButton from "Components/Buttons/MainButton";
const CartReview = () => {
  const data = [
    {
      image: brand1,
      name: "GEOLANDAR - AT/G015",
    },
    {
      image: brand1,
      name: "GEOLANDAR - AT/G015",
    },
    {
      image: brand1,
      name: "GEOLANDAR - AT/G015",
    },
    {
      image: brand1,
      name: "GEOLANDAR - AT/G015",
    },
    {
      image: brand1,
      name: "GEOLANDAR - AT/G015",
    },
    {
      image: brand1,
      name: "GEOLANDAR - AT/G015",
    },
    {
      image: brand1,
      name: "GEOLANDAR - AT/G015",
    },
    {
      image: brand1,
      name: "GEOLANDAR - AT/G015",
    },
    {
      image: brand1,
      name: "GEOLANDAR - AT/G015",
    },
    {
      image: brand1,
      name: "GEOLANDAR - AT/G015",
    },
    {
      image: brand1,
      name: "GEOLANDAR - AT/G015",
    },
    {
      image: brand1,
      name: "GEOLANDAR - AT/G015",
    },
    {
      image: brand1,
      name: "GEOLANDAR - AT/G015",
    },
    {
      image: brand1,
      name: "GEOLANDAR - AT/G015",
    },
    {
      image: brand1,
      name: "GEOLANDAR - AT/G015",
    },
  ];
  return (
    <div className="py-secondary">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-[2] flex flex-col gap-y-3">
            {data.map(({ name, image }, index) => (
              <div
                className="flex flex-wrap gap-6 items-center justify-between w-full border-b pb-3"
                key={index}
              >
                <img className="w-32 mr-12" src={image} alt="" />
                <p className="flex-1 min-w-[fit-content] font-medium">{name}</p>
                <div className="border py-2 px-4 flex items-center justify-between gap-x-6">
                  <button>+</button>
                  <p>0</p>
                  <button>-</button>
                </div>
                <button className="flex-1 flex items-center justify-center">
                  <Trash weight="fill" size={26} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex-1 h-fit lg:sticky lg:top-10 bg-dark border-t-4 border-primary p-6">
            <div className="border-b border-white pb-4">
              <label className="flex items-center space-x-2 ">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-white"
                />
                <span className={"text-white"}>Use my credits (200$)</span>
              </label>
              <p className="text-[#aaa]">
                each credit is equivalent to 1 litres
              </p>
            </div>

            <div className="border-b border-white pb-4">
              <p className="text-white text-xl rb-bold mt-4 mb-2">
                Order Summury
              </p>

              <div className="mt-3">
                <span className="flex items-center justify-between text-[#ddd]">
                  <p>Subtotal</p>
                  <p>5000$</p>
                </span>
                <span className="flex items-center justify-between text-[#ddd]">
                  <p>Tax Vat</p>
                  <p>200$</p>
                </span>
                <span className="flex items-center justify-between text-[#ddd]">
                  <p>Shipping Charge</p>
                  <p>0</p>
                </span>
                <span className="flex items-center justify-between text-[#ddd]">
                  <p>Discount 10%</p>
                  <p>-1000$</p>
                </span>
              </div>
            </div>

            <div className="pb-4">
              <span className="flex items-center justify-between">
                <p className="text-white text-xl rb-bold mt-4 mb-2 uppercase">
                  Total
                </p>
                <p className="text-white text-xl rb-bold mt-4 mb-2">5000$</p>
              </span>
              <p className="text-[#aaa] text-sm">
                By completing this order you will earn 520 pts
              </p>
              <div className="mt-6 w-full flex-1 flex">
                <MainButton isSmall={true}>Continue to checkout</MainButton>
              </div>
              <button className="text-white rb-bold text-center underline mt-3 mx-auto flex items-center justify-center">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartReview;
