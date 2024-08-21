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
                  avg_review,
                  price,
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
                  <div className="flex-[2] border-b-4">
                    <p className=" text-primary rb-bold text-sm">
                      {classification}
                    </p>
                    <p className=" rb-bold">{name}</p>
                    <div className="flex items-center gap-x-2 my-3 font-medium">
                      <p>{price}</p>
                      <p>{currency}</p>
                    </div>{" "}
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const starClass =
                          star <= Math.floor(avg_review)
                            ? "text-primary" // full star
                            : star <= Math.ceil(avg_review) &&
                              avg_review % 1 !== 0
                            ? "text-primary-half" // half star (custom style)
                            : "text-gray-400"; // empty star

                        return (
                          <svg
                            key={star}
                            className={`w-6 h-6 ${starClass}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
                          </svg>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex-1">
                    <img
                      className="h-[90%] w-[90%] mx-auto"
                      src={images}
                      alt=""
                    />
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
