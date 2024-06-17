import React from "react";
import { X } from "@phosphor-icons/react";
import logo from "assests/logo.png";
import { Link } from "react-router-dom";
import footerLinks from "Constant/Footer";

const Drawer = ({ onHandleClose, isActive }) => {
  return (
    <>
      <div
        onClick={onHandleClose}
        className={`fixed w-[100vw] h-[100vh] bg-[#000000d4] inset-0 z-[100] transition ease-in duration-300  ${
          isActive
            ? "opacity-100 z-[100] scale-1 select-auto visible"
            : "opacity-0 z-[-1] scale-[1.2] select-none invisible"
        }`}
      ></div>
      <div
        className={`fixed bg-white w-[30vw] h-[100vh] bg-[#dc0c17ac] top-0 bottom-0 right-0 z-[1000] transition ease-in duration-300  ${
          isActive
            ? "translate-x-[0] select-auto visible opacity-100"
            : "select-none invisible translate-x-[100%] opacity-0"
        }`}
      >
        <div className="bg-white flex items-center justify-between py-2 px-4">
          <Link to={"/"}>
            <img className="w-36" src={logo} alt="" />
          </Link>
          <button onClick={onHandleClose}>
            <X size={28} />
          </button>
        </div>

        <ul className="px-4 mt-secondary flex flex-col gap-y-4">
          {footerLinks.map(({ name, path }, index) => (
            <li className="text-white">
              <Link onClick={onHandleClose} to={path}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Drawer;
