import React, { createContext, useState, useEffect } from "react";
import usePostToken from "Hooks/Fetching/usePostToken";
import { useNavigate } from "react-router-dom";

// Create context
export const DealerLoginContext = createContext();

// Provider component
export const DealerLoginProvider = ({ children }) => {
  const navigate = useNavigate();
  const { loading, postData } = usePostToken();
  const [dealerIsSignIn, setDealerIsSignIn] = useState(false);
  // this state when the usr login with the main account, it save all teh data of parent and child company to render them in the welcom page
  const [allDealerData, setAllDealerData] = useState();
  // this two state is to store the choosen accountr from the dealer after he choose the accoount
  const [dealerData, setDealerData] = useState();
  const [dealerToken, setDealerToken] = useState();
  // this state when the user login to switch between user and dealer Routing and redirect the delaer to welcom page to choose the account
  const [dealerHasGetAccess, setDealerHasGetAccess] = useState(false);
  // this state to track the dealer when he choose an account to redirect hom from dealer welcom page to the main pages
  const [hasChosenAccount, setHasChosenAccount] = useState(false);

  const handleDealderSignIn = () => {
    setDealerIsSignIn(true);
  };

  const handleDealderLogout = async () => {
    try {
      const result = await postData("yokohama/auth/logout", dealerToken);
      setDealerIsSignIn(false);
      setDealerHasGetAccess(false);
      setHasChosenAccount(false);
      navigate("/");
      localStorage.removeItem("dealerIsSignIn");
      localStorage.removeItem("dealerToken");
      localStorage.removeItem("dealerData");
      localStorage.removeItem("delaerHasChosen");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleUerData = (data) => {
    setAllDealerData(data);
  };

  const handleDealerUser = (data) => {
    setDealerData(data);
    setDealerToken(data.token);
    setDealerIsSignIn(true);
    setHasChosenAccount(true);

    // Save to localStorage
    localStorage.setItem("dealerIsSignIn", JSON.stringify(true));
    localStorage.setItem("dealerToken", data.token);
    localStorage.setItem("dealerData", JSON.stringify(data));
    localStorage.setItem("delaerHasChosen", JSON.stringify(true));
    localStorage.setItem("dealerHasGetAccess", JSON.stringify(true));
  };

  useEffect(() => {
    if (localStorage.getItem("dealerIsSignIn")) {
      setDealerIsSignIn(true);
      setDealerToken(localStorage.getItem("dealerToken"));
      const storedUserData = localStorage.getItem("dealerData");
      setDealerData(JSON.parse(storedUserData));
      const storedHasChosen = localStorage.getItem("delaerHasChosen");
      setHasChosenAccount(JSON.parse(storedHasChosen));
      const storedDealerHasGetAccess =
        localStorage.getItem("dealerHasGetAccess");
      setDealerHasGetAccess(JSON.parse(storedDealerHasGetAccess));
    }
  }, []);

  return (
    <DealerLoginContext.Provider
      value={{
        dealerIsSignIn,
        setDealerIsSignIn,
        handleDealderSignIn,
        handleDealderLogout,
        handleDealerUser,
        dealerHasGetAccess,
        setDealerHasGetAccess,
        // data
        setDealerData,
        allDealerData,
        dealerData,
        setDealerToken,
        handleUerData,
        dealerToken,
        hasChosenAccount,
        setHasChosenAccount,

        dealerLoading: loading,
      }}
    >
      {children}
    </DealerLoginContext.Provider>
  );
};
