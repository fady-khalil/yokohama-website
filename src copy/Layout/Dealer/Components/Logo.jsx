import React from "react";
import logo1 from "assests/logo/HMG-white.png";

import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <Link to={"/"} className="">
      <img className="w-44 h-20 object-contain" src={logo1} alt="" />
    </Link>
  );
};

export default Logo;
