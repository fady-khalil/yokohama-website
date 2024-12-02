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
      className={`hidden xl:flex items-center flex-[4]  justify-centser rb-mediums uppercase overflow-x-hidden`}
    >
      {links?.map(
        ({ text, mega, pages, banner, url, dynamic, about }, index) => (
          <React.Fragment key={index}>
            {mega ? (
              <li
                className="group  font-medium py-8 cursor-pointer text-sm xl:text-base min-w-[max-content] text-center px-3"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {text}
                <div
                  className={`absolute left-0 right-0 min-h-[100px] h-auto z-[10000000] top-[100%] bg-[#000] text-white opacity-0 translate-y-[10%] select-none invisible group-hover:translate-y-[0%] group-hover:opacity-100 group-hover:select-auto border-b-2 shadow-2xl shadow-[#ffffff9f]  group-hover:visible transition ease-in duration-300 flex items-stretch gap-x-16`}
                >
                  <div className="w-1/4 self-stretch ">
                    <img
                      className="h-full w-full object-cover img-cut-diagonal"
                      src={banner}
                      alt="Banner"
                    />
                  </div>
                  <div className="h-auto flex flex-col gap-y-2 py-16">
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
                </div>
              </li>
            ) : (
              <Link
                to={url}
                className="group font-medium py-8 cursor-pointer text-sm xl:text-base min-w-[max-content] text-center px-3"
              >
                {text}
              </Link>
            )}

            {/* Render the iconMenu image unless it's the last item */}
            {index < links.length - 0 && (
              <img
                src={iconMenu}
                alt="Menu Icon"
                className="mx-auto w-4 h-6 "
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
