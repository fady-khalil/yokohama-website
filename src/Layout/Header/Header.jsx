import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import Drawer from "./Drawer/Drawer";
// inner
import Logo from "./Logo/Logo";
import DesktopNav from "./Navigation/DesktopNav";
import { List, ShoppingCart } from "@phosphor-icons/react";
import logo from "assests/logo/marwan-white.png";
import { ModalContext } from "context/Auth/ModalContext";
import { UserLoginContext } from "context/Auth/UserLoginContext";
import bg from "assests/find-your-tires-bg.jpg";

const Header = () => {
  const [drawerIsActive, setDrawerIsActive] = useState(false);
  const openDrawerHandler = () => {
    setDrawerIsActive(true);
  };
  const closeDrawerHandler = () => {
    setDrawerIsActive(false);
  };

  const { openDealerModalHandeler, openModalHandeler } =
    useContext(ModalContext);
  const { userIsSignIn, userData } = useContext(UserLoginContext);
  return (
    <header
      style={{ backgroundImage: `url(${bg})` }}
      className="relative top-0 z-[100000]  bg-dark"
    >
      <div className=" text-white pt-5  flex-1 min-w-full px-[1.6rem] lg:px-[3rem] ">
        <div className="xl:px-[2rem] xxl:px-[4rem] flex items-center justify-between gap-x-4 capitalize font-medium text-sm ">
          <div>
            <Link
              className="border border-primary block rounded-full p-2"
              to={"/my-cart"}
            >
              <ShoppingCart size={20} />
            </Link>
          </div>
          <div className="flex items-center gap-x-6">
            {userIsSignIn ? (
              <Link to={"/Account"} className="hover:underline">
                Hello, {userData?.username}
              </Link>
            ) : (
              <Link onClick={openModalHandeler} className="hover:underline">
                Login
              </Link>
            )}
            <button
              className="hover:underline"
              onClick={openDealerModalHandeler}
            >
              Dealer login
            </button>
          </div>
        </div>
      </div>
      <div className=" xl:px-[2rem] xxl:px-[4rem]">
        <div className=" flex items-center justify-between w-full">
          {/* logo */}
          <div className="flex-1">
            <Link
              to={"/"}
              className="w-3/4 h-full flex items-center justify-center "
            >
              <Logo />
            </Link>
          </div>
          {/* nav */}
          <DesktopNav />
          {/* logo */}
          <div className="flex-1">
            <img className="w-[90%] ml-auto" src={logo} alt="" />
          </div>
        </div>
      </div>
      <Drawer isActive={drawerIsActive} onHandleClose={closeDrawerHandler} />
    </header>
  );
};

export default Header;
