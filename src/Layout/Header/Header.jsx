import { Link } from "react-router-dom";
import { useState } from "react";
import Drawer from "./Drawer/Drawer";
// inner
import Container from "Components/Container/Container";
import Logo from "./Logo/Logo";
import DesktopNav from "./Navigation/DesktopNav";
import { List } from "@phosphor-icons/react";
import logo from "assests/logo/marwan-2-logo.jpg";

const Header = () => {
  const [drawerIsActive, setDrawerIsActive] = useState(false);
  const openDrawerHandler = () => {
    setDrawerIsActive(true);
  };
  const closeDrawerHandler = () => {
    setDrawerIsActive(false);
  };
  return (
    <header className="sticky top-0 z-50 shadow-xl bg-white">
      <div className="xl:px-[2rem] xxl:px-[4rem]">
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
            <img className="w-3/4 ml-auto" src={logo} alt="" />
          </div>
        </div>
      </div>
      <Drawer isActive={drawerIsActive} onHandleClose={closeDrawerHandler} />
    </header>
  );
};

export default Header;
