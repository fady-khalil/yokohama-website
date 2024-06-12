import React from "react";
import { Link } from "react-router-dom";
import { Dot } from "@phosphor-icons/react";
const Desktop = ({ onMouseLeft, onclose }) => {
  return (
    <div onMouseEnter={onMouseLeft} className="hidden lg:flex items-center">
      <ul className="flex items-center gap-x-6 rb-bold uppercase text-sm">
        <li className="flex items-center">
          <Link onClick={onclose} to={"/shop"}>
            Shop products
          </Link>
          <span className="flex text-5xl items-center justify-center text-primary">
            <Dot />
          </span>
        </li>
        <Link onClick={onclose} to={"/loyality"} className="flex items-center">
          Loyality
          <p className="text-xs ml-1 text-[#bbb]">(100 points)</p>
          <span className="flex text-5xl items-center justify-center text-primary">
            <Dot />
          </span>
        </Link>
        <li className="flex items-center">
          <Link onClick={onclose} to={"/gift"}>
            Gift shop
          </Link>
          <span className="flex text-5xl items-center justify-center text-primary">
            <Dot />
          </span>
        </li>
        <li>
          <Link>Marketing Materials</Link>
        </li>
      </ul>
    </div>
  );
};

export default Desktop;
