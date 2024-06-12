import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "Components/Container/Container";
import Logo from "./Components/Logo";
import Desktop from "./Components/Desktop";
import CartIcon from "./Components/Cart";
import DealerDetails from "./Components/DealerDetails/DealerDetails";
import darkLogo from "assests/dark-logo.jpg";
import { List, X, ShoppingCart } from "@phosphor-icons/react";
import MainButton from "Components/Buttons/MainButton";
const DealderHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [drawerIsVisible, setDrawerIsVisible] = useState(false);
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

      <div
        className={`h-[100vh] w-[80vw] md:w-[60vw] lg:w-[20vw] top-0 bottom-0 right-0 bg-[#efefef] fixed border-l border-black flex flex-col justify-center items-center  transition ease-in duration-300 z-[10000] text-black ${
          drawerIsVisible
            ? "translate-x-[0%] opacity-1 select-auto visible"
            : "translate-x-[100%] opacity-0 select-none invisible"
        }`}
      >
        <button className="mb-32 p-6 text-primary">
          <X onClick={ClosedrawerMenu} size={32} />
        </button>
        <ul className="flex flex-col  justify-center p-6 gap-10 rb-bold uppercase text-sm">
          <li className="flex items-center justify-center">
            <Link onClick={ClosedrawerMenu} to={"/shop"}>
              Shop products
            </Link>
          </li>
          <Link
            onClick={ClosedrawerMenu}
            to={"/loyality"}
            className="flex items-center justify-center"
          >
            Loyality
            <p className="text-xs ml-1 text-[#bbb]">(100 points)</p>
          </Link>
          <li className="flex items-center justify-center">
            <Link onClick={ClosedrawerMenu} to={"/gift"}>
              Gift shop
            </Link>
          </li>
          <li className="flex items-center justify-center">
            <Link onClick={ClosedrawerMenu}>Marketing Materials</Link>
          </li>
          <li className="flex items-center justify-center">
            <Link
              onClick={ClosedrawerMenu}
              to={"/my-cart"}
              onMouseEnter={onMouseLeft}
              className="text-black text-3xl   items-center flex"
            >
              <ShoppingCart weight="fill" />
            </Link>
          </li>
        </ul>
        <div className="mt-14 flex p-6">
          <MainButton isSmall={true}>Logout</MainButton>
        </div>
      </div>
    </header>
  );
};

export default DealderHeader;
