import { Link } from "react-router-dom";
import React, { useState } from "react";
import GetLinks from "Constant/Header/Links";
import { MagnifyingGlass, CaretRight } from "@phosphor-icons/react";
import iconMenu from "assests/Auth/y1/y1.png";

const DesktopNav = () => {
  const links = GetLinks();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <ul
      className={`hidden xl:flex text-white items-center flex-[4]  justify-centser rb-mediums uppercase overflow-x-hidden`}
    >
      {links?.map(
        (
          { text, mega, pages, banner, url, dynamic, about, products },
          index
        ) => (
          <React.Fragment key={index}>
            {mega ? (
              <li
                className="group border-b-4 border-transparent hover:border-primary font-medium py-8 cursor-pointer text-sm xl:text-base min-w-[max-content] text-center px-3"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {text}
                <div
                  className={`absolute left-0 right-0 z-[10000000] top-[100%] bg-[#000] text-white opacity-0 translate-y-[10%] select-none invisible group-hover:translate-y-[0%] group-hover:opacity-100 group-hover:select-auto border-b-2 shadow-2xl shadow-[#ffffff9f] group-hover:visible transition ease-in duration-300 flex items-stretch`}
                >
                  <div className=" flex items-center ">
                    <div className="h-full w-[22vw]">
                      <img
                        className="h-full self-stretch img-cut-diagonal"
                        src={banner}
                        alt="Banner"
                      />
                    </div>

                    {products ? (
                      <div className="py-6  w-auto max-h-max flex gap-x-14 items-start">
                        {pages?.map(({ name, brands }, index) => (
                          <div className="w-full max-w-[200px]" key={index}>
                            <div className="bg-primary rounded-2xl px-6 py-1.5 flex items-center justify-center">
                              <p className="text-white text-center font-[400] text-lg">
                                {name}
                              </p>
                            </div>
                            <div className="grid grid-cols-1 gap-4 mt-8 text-white">
                              {brands?.map(({ name, id }, index) => (
                                <Link
                                  to={`products/${id}`}
                                  className="block w-max text-start menu-link-group hover:scale-105 transform transition-transform duration-300"
                                  key={index}
                                >
                                  {name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className=" py-6 max-h-max flex flex-col gap-y-2">
                        {pages?.map(({ name, id, slug }, pageIndex) =>
                          dynamic ? (
                            <button
                              key={pageIndex}
                              onMouseEnter={() => setHoveredIndex(pageIndex)}
                              className="block mb-2 font-bold text-lg flex items-center gap-x-8 menu-link-group hover:scale-105 transform transition-transform duration-300"
                            >
                              {name}
                            </button>
                          ) : (
                            <Link
                              key={pageIndex}
                              to={`${about ? slug : `/shop/${id}`}`}
                              className="block mb-2 font-bold text-lg flex items-center gap-x-8 menu-link-group hover:scale-105 transform transition-transform duration-300"
                            >
                              {name}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ) : (
              <Link
                to={url}
                className="group border-b-4 border-transparent hover:border-primary font-medium py-8 cursor-pointer text-sm xl:text-base min-w-[max-content] text-center px-3"
              >
                {text}
              </Link>
            )}

            {/* Render the iconMenu image unless it's the last item */}
            {index < links.length - 0 && (
              <img
                src={iconMenu}
                alt="Menu Icon"
                className="mx-auto w-8 h-8 "
              />
            )}
          </React.Fragment>
        )
      )}
      <Link
        to={"/search"}
        className="flex items-center gap-x-2 px-6 font-bold uppercase text-center justify-center"
      >
        <p className="hidden xxl:block">Search</p>
        <MagnifyingGlass weight="bold" size={18} />
      </Link>
    </ul>
  );
};

export default DesktopNav;
