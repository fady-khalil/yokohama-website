import { Routes, Route } from "react-router-dom";
// layout
import Header from "Layout/Header/Header";
import Footer from "Layout/Footer/Footer";
// pages
import Home from "Pages/Home/Home";
import About from "Pages/About/About";
import Dealers from "Pages/Dealers/Dealers";
import Account from "Pages/Account/Account";
import OriginalEquipment from "Pages/OriginalEquipment/OriginalEquipment";
import Safety from "Pages/Safety/Safety";
import Contact from "Pages/Contact/Contact";
import NewAndEvent from "Pages/NewAndEvent/NewAndEvent";
import ContextProvider from "context/ContextProvider";
import ScrollToTop from "Hooks/ScrollToTop";
import MyCart from "Pages/MyCart/MyCart";
import Shop from "Pages/Shop/Shop";
import ProductDetailed from "Pages/Shop/ProductDetailed/ProductDetailed";

// modals
import AuthModal from "Pages/Auth/AuthModal";
import ForgetPasswordModal from "Pages/Auth/ForgetPassword/ForgetPasswordModal";
import DealerSiginModal from "Pages/Auth/DealerSigin/DealerSiginModal";

const UserRouting = () => {
  return (
    <div>
      <AuthModal />
      <ForgetPasswordModal />
      <DealerSiginModal />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="about-us" element={<About />} />
        <Route path="dealers" element={<Dealers />} />
        <Route path="Account" element={<Account />} />
        <Route path="safety" element={<Safety />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path="original-equipment" element={<OriginalEquipment />} />
        <Route path="news-and-event" element={<NewAndEvent />} />
        <Route path="shop/:id" element={<Shop />} />
        <Route path="product-detailed/:id" element={<ProductDetailed />} />
        <Route path="my-cart" element={<MyCart />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default UserRouting;
