import React from "react";
import darkLogo from "assests/dark-logo.jpg";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <Link to={"/"} className="h-14">
      <img className="h-full w-full" src={darkLogo} alt="" />
    </Link>
  );
};

export default Logo;
