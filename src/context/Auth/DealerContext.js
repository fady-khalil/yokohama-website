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
  const [allDealerData, setAllDealerData] = useState();
  const [dealerData, setDealerData] = useState();
  const [dealerToken, setDealerToken] = useState();
  const [hasChosenAccount, setHasChosenAccount] = useState(false);

  const handleDealderSignIn = () => {
    setDealerIsSignIn(true);
  };

  const handleDealderLogout = async () => {
    try {
      const result = await postData("yokohama/auth/logout", dealerToken);
      setDealerIsSignIn(false);
      navigate("/");
      localStorage.removeItem("dealerIsSignIn");
      localStorage.removeItem("dealerToken");
      localStorage.removeItem("dealerData");
      localStorage.removeItem("delaerHasChosen");
    } catch (err) {
      console.error("Error:", err);
    }
    // setDealerIsSignIn(false);
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
  };

  useEffect(() => {
    if (localStorage.getItem("dealerIsSignIn")) {
      setDealerIsSignIn(true);
      setDealerToken(localStorage.getItem("dealerToken"));
      const storedUserData = localStorage.getItem("dealerData");
      setDealerData(JSON.parse(storedUserData));
      const storedHasChosen = localStorage.getItem("delaerHasChosen");
      setHasChosenAccount(JSON.parse(storedHasChosen));
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
