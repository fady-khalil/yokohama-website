import React from "react";
import Container from "Components/Container/Container";
// inner
import Logo from "./Logo/Logo";
import Search from "./Search/Search";
import CartIcon from "./CartIcon/CartIcon";
import Contact from "./Contact/Contact";
import LoginButton from "./AuthButtons/Login/LoginButton";
import DealerLoginButton from "./AuthButtons/DealerLogin/DealerLoginButton";
import DesktopNav from "./Navigation/DesktopNav";
const Header = () => {
  return (
    <header>
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-8">
            <Logo />
            <DesktopNav />
          </div>
          <div className="flex items-center gap-x-8">
            <div className="flex items-center gap-x-2">
              <Search />
              <CartIcon />
            </div>
            <Contact />
            <div className="flex items-center gap-x-2">
              <LoginButton />
              <DealerLoginButton />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
