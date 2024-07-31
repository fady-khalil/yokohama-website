import { useContext } from "react";
import { ModalContext } from "context/Auth/ModalContext";
import { Link } from "react-router-dom";

const DealerLoginButton = ({ isHomePage }) => {
  const { openDealerModalHandeler } = useContext(ModalContext);
  return (
    <Link
      onClick={openDealerModalHandeler}
      className={`px-6 py-2 rounded-md border border-white bg-primary text-white`}
    >
      Dealer login
    </Link>
  );
};

export default DealerLoginButton;
