import { Link } from "react-router-dom";
import { useState } from "react";
import GetLinks from "Constant/Header/Links";
import { MagnifyingGlass, CaretRight } from "@phosphor-icons/react";

const DesktopNav = () => {
  const links = GetLinks();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <ul
      className={`hidden xl:flex items-center flex-1 justify-between px-10 xxl:px-32 rb-mediums uppercase `}
    >
      {links.map(({ text, mega, pages, banner, url, dynamic, about }, index) =>
        mega ? (
          <li
            className="group py-4 cursor-pointer   flex-1 text-center px-6 "
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {text}
            <div
              className={`absolute left-0 right-0 min-h-[100px] h-auto z-[10000000] top-[100%] bg-[#000] text-white opacity-0 translate-y-[10%] select-none invisible group-hover:translate-y-[0%] group-hover:opacity-100 group-hover:select-auto group-hover:visible transition ease-in duration-300 flex items-centesr gap-x-16`}
            >
              <div className="h-auto flex-1">
                <img
                  className="h-full min-h-[100px] w-full img-cut-diagonal"
                  src={banner}
                  alt="Banner"
                />
              </div>

              {/* First Column with Links */}
              <div className="flex-1 h-auto flex flex-col gap-y-2 py-16">
                {pages?.map(({ name, id, slug }, pageIndex) =>
                  dynamic ? (
                    <button
                      onMouseEnter={() => setHoveredIndex(pageIndex)}
                      className="block mb-2 font-bold text-lg flex items-center gap-x-8 menu-link-group hover:underline"
                    >
                      {name}
                      <span className="">
                        <CaretRight size={20} />
                      </span>
                    </button>
                  ) : (
                    <Link
                      key={pageIndex}
                      to={`${about ? slug : `/shop/${id}`}`}
                      className="block mb-2 font-bold text-lg flex items-center gap-x-8 menu-link-group hover:underline"
                      // Track the hovered page index
                    >
                      {name}
                    </Link>
                  )
                )}
              </div>

              {/* Second Column with child items */}
              <div className="flex-[2] h-auto flex flex-col items-start gap-y-4 py-16">
                {hoveredIndex !== null &&
                  pages[hoveredIndex]?.chiled?.map(
                    ({ name, slug }, childIndex) => (
                      <Link
                        to={`/content/${slug}`}
                        className="hover:underline font-bold text-sm"
                        key={childIndex}
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
            key={index}
            href={url}
            className="block py-4 flex items-center justify-center px-6 flex-1 text-center min-w-[fit-content] "
          >
            {text}
          </Link>
        )
      )}
      <Link
        to={"/search"}
        className="flex items-center gap-x-2 px-6 font-bold uppercase flex-1 text-center justify-center "
      >
        <p className="hidden xxl:block">Search</p>
        <MagnifyingGlass weight="bold" size={18} />
      </Link>
    </ul>
  );
};

export default DesktopNav;
