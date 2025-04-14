import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "assests/logo.png";
import MainButton from "Components/Buttons/MainButton";
import { DealerLoginContext } from "context/Auth/DealerContext";
import { X, ShoppingCart } from "@phosphor-icons/react";

const Drawer = ({ drawerIsVisible, ClosedrawerMenu }) => {
  const { handleDealderLogout, dealerLoading } = useContext(DealerLoginContext);
  return (
    <>
      <div
        onClick={ClosedrawerMenu}
        className={`fixed w-[100vw] h-[100vh] bg-[#000000e2] inset-0 z-[100] transition ease-in duration-300  ${
          drawerIsVisible
            ? "opacity-100 z-[100] scale-1 select-auto visible"
            : "opacity-0 z-[-1] scale-[1.2] select-none invisible"
        }`}
      ></div>
      <div
        className={`h-[100vh] w-[90vw] md:w-[60vw] lg:w-[25vw] top-0 bottom-0 right-0 bg-[#dc0c178a] fixed shadow flex flex-col justify-between  items-center  transition ease-in duration-300 z-[10000] text-black ${
          drawerIsVisible
            ? "translate-x-[0%] opacity-1 select-auto visible"
            : "translate-x-[100%] opacity-0 select-none invisible"
        }`}
      >
        <div className="bg-white flex items-center justify-between py-2 px-4 h-[6vh] w-full">
          <img className="w-36" src={logo} alt="" />
          <button className=" text-primary">
            <X onClick={ClosedrawerMenu} size={32} />
          </button>
        </div>
        <ul className="flex flex-col  justify-center p-6 gap-10 rb-bold uppercase text-sm  w-full">
          <li className="text-white border-b border-white pb-2">
            <Link onClick={ClosedrawerMenu} to={"/shop"}>
              Shop products
            </Link>
          </li>
          <li className="text-white border-b border-white pb-2">
            <Link onClick={ClosedrawerMenu} to={"/loyality"} className="f">
              Loyality
              <p className="text-xs ml-1 text-[#bbb]">(100 points)</p>
            </Link>
          </li>
          <li className="text-white border-b border-white pb-2">
            <Link onClick={ClosedrawerMenu} to={"/gift"}>
              Gift shop
            </Link>
          </li>
          <li className="text-white border-b border-white pb-2">
            <Link onClick={ClosedrawerMenu}>Marketing Materials</Link>
          </li>
          <li className="text-white border-b border-white pb-2">
            <Link
              onClick={ClosedrawerMenu}
              to={"/my-cart"}
              className="text-white text-3xl   items-center flex"
            >
              <ShoppingCart weight="fill" />
            </Link>
          </li>
        </ul>
        <div className="mt-14 flex p-6">
          <MainButton
            isLoading={dealerLoading}
            onClick={handleDealderLogout}
            border={true}
            isWhite={true}
            isSmall={true}
          >
            Logout
          </MainButton>
        </div>
      </div>
    </>
  );
};

export default Drawer;
