import { Link } from "react-router-dom";

const MainButton = ({ to, children, border, isSmall, onClick }) => {
  return (
    <Link
      onClick={onClick}
      to={to}
      className={` border text-center min-w-[fit-content] flex-1 ${
        isSmall ? "px-8 py-2.5 font-bold" : "px-10 py-3.5 text-xl font-medium"
      } ${
        border ? "border-white" : "border-transparent"
      } text-white bg-primary  `}
    >
      {children}
    </Link>
  );
};

export default MainButton;
