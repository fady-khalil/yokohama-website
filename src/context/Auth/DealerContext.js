import React, { createContext, useState } from "react";
import usePostToken from "Hooks/Fetching/usePostToken";
import { useNavigate } from "react-router-dom";

// Create context
export const DealerLoginContext = createContext();

// Provider component
export const DealerLoginProvider = ({ children }) => {
  const navigate = useNavigate();
  const { loading, postData } = usePostToken();
  const [dealerIsSignIn, setDealerIsSignIn] = useState(false);
  const [dealerData, setDealerData] = useState();
  const [dealerToken, setDealerToken] = useState();

  const handleDealderSignIn = () => {
    setDealerIsSignIn(true);
  };

  const handleDealderLogout = async () => {
    try {
      const result = await postData("yokohama/auth/logout", dealerToken);
      setDealerIsSignIn(false);
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
    }
    // setDealerIsSignIn(false);
  };

  const handleUerData = (data) => {
    setDealerData(data?.user);
    setDealerToken(data?.token);
  };

  return (
    <DealerLoginContext.Provider
      value={{
        dealerIsSignIn,
        setDealerIsSignIn,
        handleDealderSignIn,
        handleDealderLogout,

        // data
        setDealerData,
        dealerData,
        setDealerToken,
        handleUerData,
        dealerToken,

        dealerLoading: loading,
      }}
    >
      {children}
    </DealerLoginContext.Provider>
  );
};
