import React, { createContext, useEffect, useState } from "react";
import usePostToken from "Hooks/Fetching/usePostToken";
import { useNavigate } from "react-router-dom";
// Create context
export const UserLoginContext = createContext();

// Provider component
export const UserLoginProvider = ({ children }) => {
  const navigate = useNavigate();
  const { loading, postData } = usePostToken();
  const [userIsSignIn, setUserIsSignIn] = useState(false);
  const [userData, setuserData] = useState();
  const [userToken, setuserToken] = useState();

  const handleUserSignIn = () => {
    setUserIsSignIn(true);
  };

  const handleUserLogout = async () => {
    try {
      const result = await postData("yokohama/auth/logout", userToken);
      setUserIsSignIn(false);
      navigate("/");
      localStorage.removeItem("userIsSignIn");
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleUerData = (data) => {
    setuserData(data?.user);
    setuserToken(data?.token);
    localStorage.setItem("userIsSignIn", JSON.stringify(true));
    localStorage.setItem("userToken", data?.token);
    localStorage.setItem("userData", JSON.stringify(data?.user));
  };

  useEffect(() => {
    if (localStorage.getItem("userIsSignIn")) {
      setUserIsSignIn(true);
      setuserToken(localStorage.getItem("userToken"));
      const storedUserData = localStorage.getItem("userData");
      setuserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <UserLoginContext.Provider
      value={{
        userIsSignIn,
        setUserIsSignIn,
        handleUserSignIn,
        handleUserLogout,

        // data
        setuserData,
        userData,
        setuserToken,
        handleUerData,
        userToken,

        userLoading: loading,
      }}
    >
      {children}
    </UserLoginContext.Provider>
  );
};
