import { Routes, Route } from "react-router-dom";
import ScrollToTop from "Hooks/ScrollToTop";
import DealderHeader from "Layout/Dealer/DealderHeader";
import Footer from "Layout/Footer/Footer";
import DealerSiginModal from "Pages/Auth/DealerSigin/DealerSiginModal";
import { DealerLoginContext } from "context/Auth/DealerContext";
import { useContext } from "react";
import Home from "Dealer/Home/Home";
import Gift from "Dealer/Gift/Gift";
import Loyality from "Dealer/Loyality/Loyality";
import MyOrders from "Dealer/MyOrder/MyOrders";
import Shop from "Dealer/Shop/Shop";
import Cart from "Dealer/Cart/Cart";
import CartDetailed from "Dealer/Cart/CartDetailed";
import SuccessPage from "Pages/SuccessPage/SuccessPage";
import ProductDetailed from "Dealer/Shop/Components/ProductDetailed";
import WelcomePage from "Dealer/WelcomePage/WelcomePage";
const DealerRouting = () => {
  const { dealerIsSignIn, hasChosenAccount } = useContext(DealerLoginContext);
  return (
    <div>
      <DealerSiginModal />
      <ScrollToTop />
      {hasChosenAccount ? (
        <>
          <DealderHeader />
          <Routes>
            <Route index element={<Home />} />
            <Route path="gift" element={<Gift />} />
            <Route path="loyality" element={<Loyality />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="shop" element={<Shop />} />
            <Route
              path="dealer-product-detailed/:id"
              element={<ProductDetailed />}
            />
            <Route path="my-cart" element={<Cart />} />
            <Route path="success" element={<SuccessPage />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route index element={<WelcomePage />} />
        </Routes>
      )}
      {/* <Footer /> */}
    </div>
  );
};

export default DealerRouting;
