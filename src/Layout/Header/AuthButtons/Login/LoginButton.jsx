import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "context/Auth/LoginContext";
const LoginButton = ({ isHomePage }) => {
  const { openModalHandeler } = useContext(LoginContext);
  return (
    <Link
      onClick={openModalHandeler}
      className={`px-6 py-2 rounded-md border ${
        isHomePage ? "text-black  border-font" : "text-white  border-white"
      }`}
    >
      Sign In
    </Link>
  );
};

export default LoginButton;
