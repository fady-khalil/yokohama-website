import { useState, useContext } from "react";
import Container from "Components/Container/Container";
import Logo from "./Components/Logo";
import Desktop from "./Components/Desktop";
import CartIcon from "./Components/Cart";
import DealerDetails from "./Components/DealerDetails/DealerDetails";
import { List, X, ShoppingCart } from "@phosphor-icons/react";
import MainButton from "Components/Buttons/MainButton";
import { DealerLoginContext } from "context/Auth/DealerContext";
import Drawer from "./Components/Drawer";

const DealderHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [drawerIsVisible, setDrawerIsVisible] = useState(false);
  const { handleDealderLogout } = useContext(DealerLoginContext);

  const onMouseEnter = () => {
    setIsVisible(true);
  };
  const onMouseLeft = () => {
    setIsVisible(false);
  };

  const OpendrawerMenu = () => {
    setDrawerIsVisible(true);
  };
  const ClosedrawerMenu = () => {
    setDrawerIsVisible(false);
  };
  return (
    <header onMouseEnter={onMouseLeft} className="bg-dark text-white ">
      <Container>
        <div className="flex items-stretch justify-between ">
          <Logo onMouseLeft={onMouseLeft} />
          <Desktop onclose={ClosedrawerMenu} onMouseLeft={onMouseLeft} />

          <div className="flex items-stretch gap-x-4">
            <CartIcon onMouseLeft={onMouseLeft} />
            <DealerDetails
              onMouseEnter={onMouseEnter}
              onMouseLeft={onMouseLeft}
              isVisible={isVisible}
            />
            <button
              onClick={OpendrawerMenu}
              className="text-3xl bg-dark px-2 text-white"
            >
              <List />
            </button>
          </div>
        </div>
      </Container>

      <Drawer
        ClosedrawerMenu={ClosedrawerMenu}
        drawerIsVisible={drawerIsVisible}
      />
    </header>
  );
};

export default DealderHeader;
