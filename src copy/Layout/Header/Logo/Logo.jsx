import React from "react";
import logo1 from "assests/logo/HMG-white.png";

const Logo = ({ className = "" }) => {
  return (
    <div className={className}>
      <img
        src={logo1}
        alt="HMG Logo"
        className="w-3/4 md:w-1/2 xl:w-auto h-auto"
      />
    </div>
  );
};

export default Logo;
