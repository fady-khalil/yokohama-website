import { ModalProvider } from "./Auth/ModalContext";
import { DealerLoginProvider } from "./Auth/DealerContext";
import { DealerCartProvider } from "./DealerCart/DealerCartContext";
import { UserLoginProvider } from "./Auth/UserLoginContext";
const ContextProvider = ({ children }) => {
  return (
    <ModalProvider>
      <DealerLoginProvider>
        <UserLoginProvider>
          <DealerCartProvider>{children}</DealerCartProvider>
        </UserLoginProvider>
      </DealerLoginProvider>
    </ModalProvider>
  );
};

export default ContextProvider;
