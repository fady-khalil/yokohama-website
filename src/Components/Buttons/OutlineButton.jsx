import { Link } from "react-router-dom";

const OutlineButton = ({ to, children, onClick, isSmall }) => {
  return (
    <Link
      onClick={onClick}
      to={to}
      className={`min-w-[fit-content] flex-1 text-center ${
        isSmall ? "px-8 py-2.5 font-bold" : "px-10 py-3.5 text-xl font-medium"
      }   text-font  border border-primary `}
    >
      {children}
    </Link>
  );
};

export default OutlineButton;
