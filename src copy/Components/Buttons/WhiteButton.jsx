import { Link } from "react-router-dom";
import Spinner from "Components/RequestHandler/Spinner";

const WhiteButton = ({
  to,
  children,
  border,
  onClick,
  isSmall,

  isLoading,
}) => {
  return (
    <Link
      onClick={onClick}
      to={to}
      className={`rounded-2xl w-full text-center min-w-[fit-content]  bg-white text-font flex-1  flex items-center justify-center gap-x-2 ${
        isSmall ? "px-8 py-2.5 font-bold" : "px-10 py-3.5 text-xl font-medium"
      }  ${border ? "border border-primary" : ""}  text-primary`}
    >
      {isLoading && <Spinner isWhite={true} />}
      {!isLoading && children}
    </Link>
  );
};

export default WhiteButton;
