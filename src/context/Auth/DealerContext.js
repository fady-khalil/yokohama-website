import React, { createContext, useState } from "react";

// Create context
export const DealerLoginContext = createContext();

// Provider component
export const DealerLoginProvider = ({ children }) => {
  const [dealerIsSignIn, setDealerIsSignIn] = useState(false);
  const handleDealderSignIn = () => {
    setDealerIsSignIn(true);
  };
  const handleDealderLogout = () => {
    setDealerIsSignIn(false);
  };
  return (
    <DealerLoginContext.Provider
      value={{
        dealerIsSignIn,
        setDealerIsSignIn,
        handleDealderSignIn,
        handleDealderLogout,
      }}
    >
      {children}
    </DealerLoginContext.Provider>
  );
};
