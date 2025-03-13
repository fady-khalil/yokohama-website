import React from "react";
import image from "assests/product-3-removebg-preview.png";

import { Link } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const createPageArray = () => {
    let pages = [];
    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [
          1,
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
      }
      pages = [...new Set(pages)];
      if (pages[1] > 2) pages.splice(1, 0, "...");
      if (pages[pages.length - 2] < totalPages - 1)
        pages.splice(pages.length - 1, 0, "...");
    }
    return pages;
  };

  const pages = createPageArray();

  return (
    <div className="flex justify-center mt-44">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-2 px-2 sm:px-4 py-1 sm:py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        &lt;
      </button>
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`mx-1 sm:mx-2 px-2 sm:px-4 py-1 sm:py-2 rounded ${
            typeof page === "number" && page === currentPage
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-2 px-2 sm:px-4 py-1 sm:py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};
const Listing = ({ data, totalPages, currentPage, onPageChange }) => {
  return (
    <div className="col-span-3 relative z-[0]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-24">
        {data?.map(
          (
            {
              id,
              name,
              avg_review,
              price,
              classification,
              currency,
              images,
              brand,
              quantity,
              onSale,
            },
            dataIndex
          ) => (
            <Link
              className="group block"
              to={`/product-detailed/${id}`}
              key={dataIndex}
            >
              <div className="flex flex-col-reverse relative">
                {onSale && (
                  <div className="absolute -top-0 -left-0 z-10">
                    <div
                      className="bg-[#CD4C4F] text-white font-bold py-1 px-8 text-sm uppercase tracking-wider"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                        transform:
                          "rotate(-45deg) translateX(-20%) translateY(-50%)",
                      }}
                    >
                      Sale
                    </div>
                  </div>
                )}
                <div className="flex-[1] flex flex-col border-b-4">
                  <p className="text-primary rb-bold text-sm">
                    {classification}
                  </p>
                  <p className="rb-bold">{name}</p>
                  <p className="rb-medium text-sm mt-3">Brand:{brand}</p>
                  <div className="flex items-center gap-x-2 my-3 font-medium">
                    <p>{price}</p>
                    <p>
                      {currency}
                      <span className="text-primary">*</span>
                    </p>
                  </div>
                  <p className="text-xs mb-2 mt-auto">
                    <span className="text-primary">*</span>
                    {quantity?.free_quantity === 0 &&
                    quantity?.incoming_quantity === 0
                      ? " Contact us to check alternatives"
                      : quantity?.free_quantity === 0 &&
                        quantity?.incoming_quantity > 0
                      ? " Contact us for availability date"
                      : " Shop now to verify your special price"}
                  </p>
                </div>

                <div className="flex-[1] relative">
                  <img className="w-full h-full" src={image} alt="" />
                  {quantity?.free_quantity === 0 &&
                    quantity?.incoming_quantity === 0 && (
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 rb-bold">
                        Sold Out
                      </div>
                    )}
                  {quantity?.free_quantity === 0 &&
                    quantity?.incoming_quantity > 0 && (
                      <div className="absolute top-0 right-0 bg-yellow-500 text-white px-4 py-1 rb-bold">
                        Coming Soon
                      </div>
                    )}
                </div>
              </div>
              <div
                className={`flex  gap-x-2 mt-2 w-3/4 transform translate-y-[30%] opacity-0 select-none group-hover:select-auto group-hover:opacity-100 group-hover:translate-y-0 transition-transform duration-500`}
              >
                <button className="bg-dark text-center uppercase rb-bold py-2 flex-1 text-white w-full">
                  View Details
                </button>
                {quantity?.free_quantity === 0 ? (
                  <button className="border bg-gray-500 text-white text-center uppercase rb-bold py-2 flex-1 w-full">
                    Contact Us
                  </button>
                ) : (
                  <button className="border bg-primary text-white text-center uppercase rb-bold py-2 flex-1 w-full">
                    Shop Now
                  </button>
                )}
              </div>
            </Link>
          )
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default Listing;
