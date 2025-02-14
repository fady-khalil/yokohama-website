import React from "react";
import Container from "Components/Container/Container";
import listImage1 from "assests/listing/1.png";
import listImage2 from "assests/listing/2.png";
import listImage3 from "assests/listing/3.png";
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-24">
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
            },
            dataIndex
          ) => (
            <Link
              to={`/product-detailed/${id}`}
              className="flex items-center relative group"
              key={dataIndex}
            >
              <div className="flex-[3] border-b-4">
                <p className=" text-primary rb-bold text-sm">
                  {classification}
                </p>
                <p className=" rb-bold">{name}</p>
                <p className="rb-medium text-sm mt-3">Brand:{brand}</p>
                <div className="flex items-center gap-x-2 my-3 font-medium">
                  <p>{price}</p>
                  <p>{currency}*</p>
                </div>{" "}
                * Shop now to verifie your special price
                <p className="text-xs mb-2"></p>
                {/* <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const starClass =
                      star <= Math.floor(avg_review)
                        ? "text-primary" // full star
                        : star <= Math.ceil(avg_review) && avg_review % 1 !== 0
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
                </div> */}
              </div>

              <div className="flex-[2]">
                <img className="w-full h-full" src={images} alt="" />
              </div>
              <div
                className={`absolute flex items-center gap-x-4 left-0 -bottom-6 w-3/4 mx-auto h-auto transform translate-y-[30%] opacity-0 select-none group-hover:select-auto group-hover:opacity-100 group-hover:translate-y-0 transition-transform duration-500`}
              >
                <button className="bg-dark text-center uppercase rb-bold py-1  flex-1 text-white w-full">
                  View Details
                </button>
                <button className="border bg-primary text-white  text-center uppercase rb-bold py-1  flex-1 w-full">
                  Shop Now
                </button>
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
