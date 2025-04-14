import { ModalProvider } from "./Auth/ModalContext";
import { DealerLoginProvider } from "./Auth/DealerContext";
import { DealerCartProvider } from "./DealerCart/DealerCartContext";
import { UserLoginProvider } from "./Auth/UserLoginContext";
import { GuestCartProvider } from "./Guest/GuestCartContext";
import { UserCartProvider } from "./User/CartContext";
import { UserWishlistProvider } from "./User/WishlistContext";
const ContextProvider = ({ children }) => {
  return (
    <ModalProvider>
      <DealerLoginProvider>
        <UserLoginProvider>
          <DealerCartProvider>
            <GuestCartProvider>
              <UserCartProvider>
                <UserWishlistProvider>{children}</UserWishlistProvider>
              </UserCartProvider>
            </GuestCartProvider>
          </DealerCartProvider>
        </UserLoginProvider>
      </DealerLoginProvider>
    </ModalProvider>
  );
};

export default ContextProvider;
