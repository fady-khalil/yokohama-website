import { Link } from "react-router-dom";
import Spinner from "Components/RequestHandler/Spinner";

const MainButton = ({
  to,
  children,
  border,
  isSmall,
  onClick,
  isWhite,
  isLoading,
}) => {
  return (
    <Link
      onClick={onClick}
      to={to}
      className={` border text-center min-w-[fit-content] flex-1 flex items-center justify-center gap-x-2 capitalize ${
        isSmall ? "px-8 py-2.5 font-bold" : "px-10 py-3.5 text-xl font-medium"
      } ${border ? "border-white" : "border-transparent"}  ${
        isWhite ? "bg-white text-black" : "bg-primary text-white"
      }   `}
    >
      {isLoading && <Spinner isWhite={true} />}
      {!isLoading && children}
    </Link>
  );
};

export default MainButton;
