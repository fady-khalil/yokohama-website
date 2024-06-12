import { useState } from "react";

import Container from "Components/Container/Container";
import Logo from "./Components/Logo";
import Desktop from "./Components/Desktop";
import CartIcon from "./Components/Cart";
import DealerDetails from "./Components/DealerDetails/DealerDetails";
const DealderHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onMouseEnter = () => {
    setIsVisible(true);
  };
  const onMouseLeft = () => {
    setIsVisible(false);
  };
  return (
    <header onMouseEnter={onMouseLeft} className="bg-dark text-white ">
      <Container>
        <div className="flex items-stretch justify-between ">
          <Logo onMouseLeft={onMouseLeft} />
          <Desktop onMouseLeft={onMouseLeft} />

          <div className="flex items-stretch gap-x-10">
            <CartIcon onMouseLeft={onMouseLeft} />
            <DealerDetails
              onMouseEnter={onMouseEnter}
              onMouseLeft={onMouseLeft}
              isVisible={isVisible}
            />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default DealderHeader;
