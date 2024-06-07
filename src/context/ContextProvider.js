import { LoginProvider } from "./Auth/LoginContext";

const ContextProvider = ({ children }) => {
  return <LoginProvider>{children}</LoginProvider>;
};

export default ContextProvider;
