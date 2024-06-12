import React, { Children, createContext, useState } from "react";

export const DealerCartContext = createContext();

export const DealerCartProvider = ({ children }) => {
  const [cartModalIsVisible, setCartModalIsVisible] = useState(false);

  const handleCartModalVisible = () => {
    setCartModalIsVisible(true);
  };
  const handleCloseCartModalVisible = () => {
    setCartModalIsVisible(false);
  };

  return (
    <DealerCartContext.Provider
      value={{
        cartModalIsVisible,
        handleCartModalVisible,
        handleCloseCartModalVisible,
      }}
    >
      {children}
    </DealerCartContext.Provider>
  );
};
