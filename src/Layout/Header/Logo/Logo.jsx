import React from "react";
import logo from "assests/logo.png";
import { Link } from "react-router-dom";
import darkLogo from "assests/dark-logo.jpg";
const Logo = ({ isHomePage }) => {
  return (
    <Link to={"/"}>
      <img
        className={`${isHomePage ? "w-52" : "w-32"}`}
        src={isHomePage ? logo : darkLogo}
        alt=""
      />
    </Link>
  );
};

export default Logo;
