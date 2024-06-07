import React, { createContext, useState, useEffect } from "react";
// import GetContent from "utility/GetContent";
// import { useLocation } from "react-router-dom";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [modalIsActive, setModalIsActive] = useState(false);
  const [forgotModalIsActive, setForgotModalIsActvie] = useState(false);
  const [dealderModalIsActive, setDealerModalIsActive] = useState(false);

  const openModalHandeler = () => {
    setModalIsActive(true);
  };
  const closeModalHandeler = () => {
    setModalIsActive(false);
  };
  const openForgotModalHandeler = () => {
    setForgotModalIsActvie(true);
  };
  const closeForgotModalHandeler = () => {
    setForgotModalIsActvie(false);
  };
  const openDealerModalHandeler = () => {
    setDealerModalIsActive(true);
  };
  const closeDealerModalHandeler = () => {
    setDealerModalIsActive(false);
  };

  return (
    <LoginContext.Provider
      value={{
        modalIsActive,
        openModalHandeler,
        closeModalHandeler,
        forgotModalIsActive,
        openForgotModalHandeler,
        closeForgotModalHandeler,

        openDealerModalHandeler,
        closeDealerModalHandeler,
        dealderModalIsActive,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
