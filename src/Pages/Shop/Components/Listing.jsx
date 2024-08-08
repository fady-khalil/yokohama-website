import React from "react";
import Container from "Components/Container/Container";
import listImage1 from "assests/listing/1.png";
import listImage2 from "assests/listing/2.png";
import listImage3 from "assests/listing/3.png";
import { Link } from "react-router-dom";

const Listing = ({ data }) => {
  return (
    <div className="col-span-3 my-secondary relative z-[0]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-24">
          {data?.map((item, dataIndex) =>
            item.products?.map(
              (
                {
                  id,
                  name,
                  family,
                  description,
                  price,
                  brand,
                  classification,
                  currency,
                  images,
                },
                productIndex
              ) => (
                <Link
                  to={`/product-detailed/${id}`}
                  className="flex items-center relative group"
                  key={`${dataIndex}-${productIndex}`}
                >
                  <div className="flex-1 border-b-4">
                    <p className="mt-6 text-primary rb-bold text-sm">
                      {classification}
                    </p>
                    <p className="rb-bold">{name}</p>
                    <div className="flex items-center justify-end gap-x-2 mt-2 font-medium">
                      <p>{price}</p>
                      <p>{currency}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <img className="object-cover" src={images} alt="" />
                  </div>
                  <div
                    className={`absolute left-0 -bottom-14 w-full h-auto bg-primary transform translate-y-[30%] opacity-0 select-none group-hover:select-auto group-hover:opacity-100 group-hover:translate-y-0 transition-transform duration-500`}
                  >
                    <div className="flex items-center justify-between px-2">
                      <span className="flex flex-col items-center justify-center gap-y-1 text-white border-r flex-1 border-white">
                        <img className="w-8 h-8" src={listImage1} alt="" />
                        <p className="text-xs pb-1 rb-medium">
                          Fuel efficiency
                        </p>
                      </span>
                      <span className="flex flex-col items-center justify-center gap-y-1 text-white border-r flex-1 border-white">
                        <img className="w-8 h-8" src={listImage2} alt="" />
                        <p className="text-xs pb-1 rb-medium">Wet grip</p>
                      </span>
                      <span className="flex flex-col items-center justify-center gap-y-1 text-white flex-1">
                        <img className="w-8 h-8" src={listImage3} alt="" />
                        <p className="text-xs pb-1 rb-medium">Crossover</p>
                      </span>
                    </div>
                    <button className="bg-dark text-center uppercase rb-bold py-1 border-t border-white flex-1 text-white w-full">
                      Shop Now
                    </button>
                  </div>
                </Link>
              )
            )
          )}
        </div>
      </Container>
    </div>
  );
};

export default Listing;
