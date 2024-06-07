import { Link } from "react-router-dom";

const WhiteButton = ({ to, children, border, onClick, isSmall }) => {
  return (
    <Link
      onClick={onClick}
      to={to}
      className={`block w-full text-center  bg-white text-font ${
        isSmall ? "px-8 py-2.5 font-bold" : "px-10 py-3.5 text-xl font-medium"
      }  ${border ? "border border-primary" : ""}  text-primary`}
    >
      {children}
    </Link>
  );
};

export default WhiteButton;
