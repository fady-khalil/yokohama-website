import { useState, useContext } from "react";
import Container from "Components/Container/Container";
import Logo from "./Components/Logo";
import Desktop from "./Components/Desktop";
import CartIcon from "./Components/Cart";
import DealerDetails from "./Components/DealerDetails/DealerDetails";
import { List } from "@phosphor-icons/react";
import { DealerLoginContext } from "context/Auth/DealerContext";
import Drawer from "./Components/Drawer";

const DealderHeader = () => {
  const [drawerIsVisible, setDrawerIsVisible] = useState(false);
  const { dealerData } = useContext(DealerLoginContext);

  const OpendrawerMenu = () => {
    setDrawerIsVisible(true);
  };
  const ClosedrawerMenu = () => {
    setDrawerIsVisible(false);
  };

  return (
    <header className="bg-dark text-white ">
      <Container>
        <div className="flex items-stretch justify-between ">
          <Logo />
          <Desktop onclose={ClosedrawerMenu} />

          <div className="flex items-stretch gap-x-4">
            <CartIcon />
            <DealerDetails data={dealerData} />
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
