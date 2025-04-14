import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Drawer from "./Drawer/Drawer";
import Logo from "./Logo/Logo";
import DesktopNav from "./Navigation/DesktopNav";
import CartIcon from "./CartIcon/CartIcon";
import UserMenu from "./UserMenu/UserMenu";
import logo from "assests/logo/marwan-white.png";
import { UserLoginContext } from "context/Auth/UserLoginContext";
import { UserCartContext } from "context/User/CartContext";
import bg from "assests/find-your-tires-bg.jpg";
import { List } from "@phosphor-icons/react";

const Header = ({ isHomePage }) => {
  const location = useLocation();
  const [drawerIsActive, setDrawerIsActive] = useState(false);
  const { userIsSignIn, userData } = useContext(UserLoginContext);
  const { cart } = useContext(UserCartContext);

  const toggleDrawer = () => setDrawerIsActive((prev) => !prev);

  return (
    <header
      style={{ backgroundImage: `url(${bg})` }}
      className="relative top-0 z-[100000] bg-dark"
    >
      {/* Top Bar */}
      <div className="hidden lg:block text-white flex-1 min-w-full px-[1.6rem] lg:px-[3rem]">
        <div className="xl:px-[2rem] xxl:px-[4rem] flex items-center justify-end gap-x-4 capitalize font-medium text-sm">
          <div className="flex items-center justify-end pt-3">
            <CartIcon itemCount={cart?.cart_items?.length} />
            <UserMenu
              userIsSignIn={userIsSignIn}
              userData={userData}
              isHomePage={isHomePage}
            />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="xl:px-[2rem] xxl:px-[4rem] py-3 lg:py-0">
        <div className="flex items-center gap-x-8 justify-between w-full">
          <div className="flex-1">
            <Link
              title={location.pathname === "/" ? "" : "go to home page"}
              to="/"
              className="w-3/4 h-full flex items-center justify-center"
            >
              <Logo className="w-full" />
            </Link>
          </div>
          <DesktopNav />
          <div className="flex-1 flex items-center justify-end gap-x-3 pr-2">
            <img
              className="w-3/4 md:w-1/2 xl:w-[90%] ml-auto"
              src={logo}
              alt="Marwan Logo"
            />
            <button className="xl:hidden" onClick={toggleDrawer}>
              <List color="white" size={32} />
            </button>
          </div>
        </div>
      </div>

      <Drawer
        isActive={drawerIsActive}
        onHandleClose={() => setDrawerIsActive(false)}
      />
    </header>
  );
};

export default Header;
