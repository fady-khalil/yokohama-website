import React from "react";
import { useContext } from "react";
import { ModalContext } from "context/Auth/ModalContext";
import Button from "Components/Common/Button/Button";

const LoginButton = ({ isHomePage }) => {
  const { openModalHandeler } = useContext(ModalContext);

  return (
    <Button
      onClick={openModalHandeler}
      variant="outline"
      className={
        isHomePage ? "text-black border-font" : "text-white border-white"
      }
    >
      Sign In
    </Button>
  );
};

export default LoginButton;
