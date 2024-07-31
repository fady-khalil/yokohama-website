import { useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
// inner
import Logo from "./Logo/Logo";
import Search from "./Search/Search";
import CartIcon from "./CartIcon/CartIcon";
import LoginButton from "./AuthButtons/Login/LoginButton";
import DealerLoginButton from "./AuthButtons/DealerLogin/DealerLoginButton";
import DesktopNav from "./Navigation/DesktopNav";
import { UserLoginContext } from "context/Auth/UserLoginContext";
import { User, List } from "@phosphor-icons/react";
import Drawer from "./Drawer/Drawer";
const Header = () => {
  const { userIsSignIn, userData } = useContext(UserLoginContext);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [drawerIsActive, setDrawerIsActive] = useState(false);
  const openDrawerHandler = () => {
    setDrawerIsActive(true);
  };
  const closeDrawerHandler = () => {
    setDrawerIsActive(false);
  };
  return (
    <header className={`${isHomePage ? "bg-white" : "bg-dark"}`}>
      <div className={`flex items-stretch justify-between `}>
        <div className="pr-[1.5rem] md:pl-[3rem]">
          <Logo isHomePage={isHomePage} />
        </div>

        <DesktopNav isHomePage={isHomePage} />
        <div className="flex items-stretch ">
          <div className="hidden lg:flex items-center">
            <CartIcon isHomePage={isHomePage} />
            <Search isHomePage={isHomePage} />
            {userIsSignIn && (
              <Link
                to={"/Account"}
                className={` flex bg-primary items-center  h-full border-r  border-[#777] px-6 gap-x-2 ${
                  isHomePage ? "text-white" : "text-white"
                }`}
              >
                <User
                  isHomePage={isHomePage}
                  weight="fill"
                  color={isHomePage ? "white" : "white"}
                />
                <p className="rb-medium uppercase texts-sm">
                  Hello {userData?.username}
                </p>
              </Link>
            )}
          </div>
          {!userIsSignIn && (
            <div className="hidden lg:flex items-center  py-2 gap-x-2 px-6">
              <LoginButton isHomePage={isHomePage} />
              <DealerLoginButton isHomePage={isHomePage} />
            </div>
          )}
          <button onClick={openDrawerHandler} className="text-3xl bg-dark px-4">
            <List color={"white"} />
          </button>
        </div>
      </div>

      <Drawer isActive={drawerIsActive} onHandleClose={closeDrawerHandler} />
    </header>
  );
};

export default Header;
