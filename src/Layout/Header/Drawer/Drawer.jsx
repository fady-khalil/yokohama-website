import React from "react";
import { X } from "@phosphor-icons/react";
import logo from "assests/logo.png";
import { Link } from "react-router-dom";
import footerLinks from "Constant/Footer";
import {
  FacebookLogo,
  InstagramLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
const Drawer = ({ onHandleClose, isActive }) => {
  return (
    <>
      <div
        onClick={onHandleClose}
        className={`fixed w-[100vw] h-[100vh] bg-[#000000e2] inset-0 z-[100] transition ease-in duration-300  ${
          isActive
            ? "opacity-100 z-[100] scale-1 select-auto visible"
            : "opacity-0 z-[-1] scale-[1.2] select-none invisible"
        }`}
      ></div>
      <div
        className={`fixed bg-white w-[80vw] lg:w-[30vw] h-[100vh] bg-[#dc0c17ac] top-0 bottom-0 right-0 z-[1000] transition ease-in duration-300  ${
          isActive
            ? "translate-x-[0] select-auto visible opacity-100"
            : "select-none invisible translate-x-[100%] opacity-0"
        }`}
      >
        {/* header */}
        <div className="bg-white flex items-center justify-between py-2 px-4 h-[6vh]">
          <Link to={"/"}>
            <img className="w-36" src={logo} alt="" />
          </Link>
          <button onClick={onHandleClose}>
            <X size={28} />
          </button>
        </div>

        <div className=" flex flex-col  justify-between mb-10 h-[94vh]">
          <ul className="px-4 mt-secondary flex flex-col gap-y-4">
            {footerLinks.map(({ name, path }, index) => (
              <li className="text-white border-b border-white pb-2">
                <Link onClick={onHandleClose} to={path}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center justify-center   mb-10">
            <span className="mb-4 text-white border-b border-white pb-1">
              <p>Follow us</p>
            </span>
            <ul className="flex items-center justify-center gap-x-4">
              <li className="bg-white p-1 text-xl rounded-full">
                <a href="">
                  <FacebookLogo color="black" weight="bold" />
                </a>
              </li>
              <li className="bg-white p-1 text-xl rounded-full">
                <a href="">
                  <InstagramLogo color="black" weight="bold" />
                </a>
              </li>
              <li className="bg-white p-1 text-xl rounded-full">
                <a href="">
                  <YoutubeLogo color="black" weight="bold" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;
