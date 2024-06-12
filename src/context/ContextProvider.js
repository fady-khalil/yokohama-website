import { LoginProvider } from "./Auth/LoginContext";
import { DealerLoginProvider } from "./Auth/DealerContext";
import { DealerCartProvider } from "./DealerCart/DealerCartContext";
const ContextProvider = ({ children }) => {
  return (
    <LoginProvider>
      <DealerLoginProvider>
        <DealerCartProvider>{children}</DealerCartProvider>
      </DealerLoginProvider>
    </LoginProvider>
  );
};

export default ContextProvider;
