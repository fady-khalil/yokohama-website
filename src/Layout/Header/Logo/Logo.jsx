import React from "react";
import logo from "assests/logo.png";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <Link to={"/"}>
      <img className="w-52" src={logo} alt="" />
    </Link>
  );
};

export default Logo;
