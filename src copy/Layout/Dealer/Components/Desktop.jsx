import React from "react";
import { Link } from "react-router-dom";
import { Dot } from "@phosphor-icons/react";
import iconMenu from "assests/Auth/y1/y1.png";

const Desktop = ({ onclose }) => {
  return (
    <div className="hidden lg:flex items-center">
      <ul className="flex items-center gap-x-6 rb-bold uppercase text-sm">
        <Link onClick={onclose} to={"/shop"}>
          Shop products
        </Link>
        <img src={iconMenu} alt="Menu Icon" className="mx-auto w-8 h-8 " />
        <Link onClick={onclose} to={"/my-orders"}>
          My Balacne
        </Link>
        {/* <Link onClick={onclose} to={"/loyality"} className="flex items-center">
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
        </li> */}
      </ul>
    </div>
  );
};

export default Desktop;
