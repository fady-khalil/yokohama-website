import React from "react";
import { useContext } from "react";
import { ModalContext } from "context/Auth/ModalContext";
import Button from "Components/Common/Button/Button";

const DealerLoginButton = () => {
  const { openDealerModalHandeler } = useContext(ModalContext);

  return (
    <Button onClick={openDealerModalHandeler} variant="primary">
      Dealer login
    </Button>
  );
};

export default DealerLoginButton;
