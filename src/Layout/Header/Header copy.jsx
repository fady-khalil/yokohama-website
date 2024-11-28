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
      {/* <div className="bg-dark text-white py-2.5 flex-1 min-w-full px-[1.6rem] lg:px-[3rem] ">
        <Container>
          <div className="flex items-center justify-between gap-x-4 uppercase font-medium text-sm ">
            <Link>Login</Link>
            <Link>Dealer login</Link>
          </div>
        </Container>
      </div> */}
      <div className="flex px-[1.6rem] py-4 xl:py-0 lg:px-[3rem] xl:px-[0rem]">
        <div className=" xl:pl-[3rem] flex items-stretch justify-between w-full">
          <div>
            <Link
              to={"/"}
              className="w-[10rem] xxl:w-[12rem] h-full flex items-center justify-center "
            >
              <Logo />
            </Link>
          </div>
          <DesktopNav />
        </div>
        {/* <button className="hidden xl:block bg-primary text-white px-6 py-6 font-bold min-w-[max-content]">
          Find a dealer
        </button>
        <button onClick={openDrawerHandler} className=" xl:hidden">
          <List size={32} />
        </button> */}

        <div>
          <img className="min-w-[12rem]" src={logo} alt="" />
        </div>
      </div>

      <Drawer isActive={drawerIsActive} onHandleClose={closeDrawerHandler} />
    </header>
  );
};

export default Header;
