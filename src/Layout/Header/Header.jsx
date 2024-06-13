import { useContext } from "react";
import Container from "Components/Container/Container";
import { useLocation, Link } from "react-router-dom";
// inner
import Logo from "./Logo/Logo";
import Search from "./Search/Search";
import CartIcon from "./CartIcon/CartIcon";
import LoginButton from "./AuthButtons/Login/LoginButton";
import DealerLoginButton from "./AuthButtons/DealerLogin/DealerLoginButton";
import DesktopNav from "./Navigation/DesktopNav";
import { LoginContext } from "context/Auth/LoginContext";
import { User, List } from "@phosphor-icons/react";
const Header = () => {
  const { userIsLoggedIn } = useContext(LoginContext);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <header className={`${isHomePage ? "bg-white" : "bg-dark"}`}>
      <Container>
        <div className={`flex items-stretch justify-between `}>
          <div className="flex items-center gap-x-8">
            <Logo isHomePage={isHomePage} />
          </div>
          <DesktopNav isHomePage={isHomePage} />
          <div className="flex items-stretch ">
            <div className="hidden lg:flex items-center">
              <CartIcon isHomePage={isHomePage} />
              <Search isHomePage={isHomePage} />
              {userIsLoggedIn && (
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
                  <p className="rb-bold uppercase text-sm">Hello User</p>
                </Link>
              )}
            </div>
            {!userIsLoggedIn && (
              <div className="hidden lg:flex items-center  py-2 gap-x-2 px-6">
                <LoginButton isHomePage={isHomePage} />
                <DealerLoginButton isHomePage={isHomePage} />
              </div>
            )}
            <button className="text-3xl bg-dark px-4">
              <List color={isHomePage ? "white" : "white"} />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
