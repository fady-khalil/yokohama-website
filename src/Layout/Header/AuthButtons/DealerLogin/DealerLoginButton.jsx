import { useContext } from "react";
import { LoginContext } from "context/Auth/LoginContext";
import { Link } from "react-router-dom";

const DealerLoginButton = () => {
  const { openDealerModalHandeler } = useContext(LoginContext);
  return (
    <Link
      onClick={openDealerModalHandeler}
      className="px-6 py-2 rounded-md border border-white bg-primary text-white"
    >
      Dealer login
    </Link>
  );
};

export default DealerLoginButton;
