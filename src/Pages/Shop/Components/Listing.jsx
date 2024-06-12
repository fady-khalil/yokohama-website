import React from "react";
import productsData from "Constant/Products";
import Container from "Components/Container/Container";
import listImage1 from "assests/listing/1.png";
import listImage2 from "assests/listing/2.png";
import listImage3 from "assests/listing/3.png";
import { Link } from "react-router-dom";
const Listing = () => {
  return (
    <div className="col-span-3 my-secondary">
      <Container>
        <div className="grid grid-cols-3 gap-x-14 gap-y-24">
          {productsData.map(({ catImage, type, name, image }, index) => (
            <Link
              to={"/product-detailed"}
              className="flex items-center relative group"
              key={index}
            >
              <div className="flex-1 border-b-4">
                <img className="w-20" src={catImage} alt="" />
                <p className="mt-6 text-primary rb-bold text-sm">{type}</p>
                <p className="rb-bold">{name}</p>
              </div>
              <div className="flex-1">
                <img className="object-cover" src={image} alt="" />
              </div>

              <div
                className={`absolute left-0 -bottom-10 w-full h-auto bg-primary transform translate-y-[30%] opacity-0 select-none group-hover:select-auto group-hover:opacity-100 group-hover:translate-y-0 transition-transform duration-500`}
              >
                <div className="flex items-center justify-between px-2">
                  <span className="flex flex-col items-center justify-center gap-y-1 text-white border-r flex-1 border-white">
                    <img className="w-10 h-10" src={listImage1} alt="" />
                    <p className="text-xs pb-1 rb-medium">Fuel efficiency</p>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-y-1 text-white border-r flex-1 border-white">
                    <img className="w-10 h-10" src={listImage2} alt="" />
                    <p className="text-xs pb-1 rb-medium">Wet grip</p>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-y-1 text-white flex-1">
                    <img className="w-10 h-10" src={listImage3} alt="" />
                    <p className="text-xs pb-1 rb-medium">crossover</p>
                  </span>
                </div>
                <button className="bg-dark text-center text-center uppercase rb-bold py-3 border-t border-white flex-1 text-white w-full">
                  Shop Now
                </button>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Listing;
