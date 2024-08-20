import React, { createContext, useState, useEffect } from "react";
// import GetContent from "utility/GetContent";
// import { useLocation } from "react-router-dom";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalIsActive, setModalIsActive] = useState(false);
  const [forgotModalIsActive, setForgotModalIsActvie] = useState(false);
  const [dealderModalIsActive, setDealerModalIsActive] = useState(false);
  const [newAddressModalIsActive, setNewAddressModalIsActive] = useState(false);

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
  const openNewAddressModalHandeler = () => {
    setNewAddressModalIsActive(true);
  };
  const closeNewAddressModalHandeler = () => {
    setNewAddressModalIsActive(false);
  };

  return (
    <ModalContext.Provider
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

        // // user
        // userIsLoggedIn,
        // handleUserLogin,
        // handleUserLogout,

        openNewAddressModalHandeler,
        closeNewAddressModalHandeler,
        newAddressModalIsActive,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
