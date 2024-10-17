import { X } from "@phosphor-icons/react";
import logo from "assests/logo.png";
import { Link } from "react-router-dom";
import FooterLinks from "Constant/Footer";

import {
  FacebookLogo,
  InstagramLogo,
  YoutubeLogo,
  User,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { ModalContext } from "context/Auth/ModalContext";

const Drawer = ({ onHandleClose, isActive }) => {
  const { openModalHandeler, openDealerModalHandeler, userIsLoggedIn } =
    useContext(ModalContext);
  const [openIndex, setOpenIndex] = useState(null); // Track which dropdown is open

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close
  };
  const footerLinks = FooterLinks();

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
        className={`fixed  w-[90vw] lg:w-[30vw] h-[100vh] bg-[#dc0c178a] top-0 bottom-0 right-0 z-[100000] transition ease-in duration-300  ${
          isActive
            ? "translate-x-[0] select-auto visible opacity-100"
            : "select-none invisible translate-x-[100%] opacity-0"
        }`}
      >
        {/* header */}
        <div className="bg-white flex items-center justify-between py-2 px-4 h-[6vh]">
          <Link onClick={onHandleClose} to={"/"}>
            <img className="w-36" src={logo} alt="" />
          </Link>
          <button onClick={onHandleClose}>
            <X size={28} />
          </button>
        </div>

        {/* drawer */}
        <div className=" flex flex-col  justify-between mb-10 h-[94vh]">
          <ul className="px-4 mt-secondary flex flex-col gap-y-4">
            {footerLinks.map(
              ({ name, path, list, mega, pages, dynamic }, parentIndex) =>
                mega && pages ? (
                  <li
                    key={parentIndex}
                    className="text-white border-b border-white pb-2 capitalize"
                  >
                    {/* Parent clickable title */}
                    <span
                      onClick={() => toggleDropdown(parentIndex)}
                      className="cursor-pointer flex items-center gap-x-2"
                    >
                      {name}
                      {openIndex === parentIndex ? (
                        <CaretUp size={24} />
                      ) : (
                        <CaretDown size={24} />
                      )}
                    </span>

                    {/* Conditionally render the dropdown in normal flow */}
                    {openIndex === parentIndex && (
                      <ul className="mt-2 space-y-1  list-inside list-disc">
                        {pages.map(({ name, slug }, childIndex) => (
                          <li
                            key={childIndex}
                            className="text-white  pb-2 capitalize"
                          >
                            <Link onClick={onHandleClose} to={slug}>
                              {name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li
                    key={parentIndex}
                    className="text-white border-b border-white pb-2 capitalize"
                  >
                    <Link onClick={onHandleClose} to={path}>
                      {name}
                    </Link>
                  </li>
                )
            )}

            <li className="text-white border-b border-white pb-2">
              <Link onClick={onHandleClose} to={"my-cart"}>
                My Cart
              </Link>
            </li>
          </ul>

          {!userIsLoggedIn && (
            <div className="px-4 flex item-center gap-x-4 lg:hidden">
              <button
                onClick={() => {
                  onHandleClose();
                  openModalHandeler();
                }}
                className="flex-1 border border-black rounded-md py-2 bg-white"
              >
                Sign in
              </button>
              <button
                onClick={() => {
                  onHandleClose();
                  openDealerModalHandeler();
                }}
                className="flex-1 border border-black rounded-md py-2 bg-white"
              >
                Dealer login
              </button>
            </div>
          )}

          {userIsLoggedIn && (
            <button className="py-4 bg-white text-primary rb-bold border border-white w-[90%] mx-auto flex items-center  justify-center gap-x-2">
              <User weight="bold" size={22} />
              <Link to={"/Account"}>User Name</Link>
            </button>
          )}

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
