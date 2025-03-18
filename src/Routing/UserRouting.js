import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserLoginContext } from "context/Auth/UserLoginContext";
// hooks and helpers
import ScrollToTop from "Hooks/ScrollToTop";
import PrivateRoute from "Helpers/PrivateRoute";
// layout
import Header from "Layout/Header/Header";
import Footer from "Layout/Footer/Footer";
// pages
import Home from "Pages/Home/Home";
import About from "Pages/About/About";
import Dealers from "Pages/Dealers/Dealers";
import OriginalEquipment from "Pages/OriginalEquipment/OriginalEquipment";
import Safety from "Pages/Safety/Safety";
import Contact from "Pages/Contact/Contact";
import NewAndEvent from "Pages/NewAndEvent/NewAndEvent";
import NewsDetailed from "Pages/NewAndEvent/NewsDetailed";

import Products from "Pages/Products/Products";
import Shop from "Pages/Shop/Shop";
import ProductDetailed from "Pages/Shop/ProductDetailed/ProductDetailed";
import Account from "Pages/Account/Account";
import MyCart from "Pages/MyCart/MyCart";
import GuestCart from "Pages/GuestCart/GuestCart";
import GuestCheckout from "Pages/GuestCart/GuestCheckout.jsx";
import SuccessPage from "Pages/SuccessPage/SuccessPage";
import Search from "Pages/Search/Search";
import Content from "Pages/Content/Content";

// about
import Brand from "Pages/About/Sections/Brand/Brand";
import MissionAndVission from "Pages/About/Sections/Mission/MissionAndVission";
import WhyUs from "Pages/About/Sections/WhyUs/WhyUs";
// modals
import AuthModal from "Pages/Auth/AuthModal";
import ForgetPasswordModal from "Pages/Auth/ForgetPassword/ForgetPasswordModal";
import DealerSiginModal from "Pages/Auth/DealerSigin/DealerSiginModal";
import AddNewAddress from "Pages/MyCart/ShippingAndBilling/Components/AddNewAddress";
import Channels from "Pages/About/Sections/Channels/Channels";

// routing page
import AccessDeniedPage from "Pages/AccessDenied/AccessDeniedPage";
import NotFound from "Pages/NotFound/NotFound.jsx";

const UserRouting = () => {
  const { userIsSignIn } = useContext(UserLoginContext);
  return (
    <div>
      <AuthModal />
      <ForgetPasswordModal />
      <DealerSiginModal />
      <AddNewAddress />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="about-us" element={<About />} />
        <Route path="dealers" element={<Dealers />} />
        <Route path="safety" element={<Safety />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path="guest-checkout" element={<GuestCheckout />} />
        <Route path="original-equipment" element={<OriginalEquipment />} />
        <Route path="news-and-event" element={<NewAndEvent />} />
        <Route path="news-and-event/:slug" element={<NewsDetailed />} />
        <Route path="access-denied" element={<AccessDeniedPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="shop/:id" element={<Shop />} />
        <Route path="products/:id" element={<Products />} />
        <Route path="content/:slug" element={<Content />} />
        <Route path="product-detailed/:id" element={<ProductDetailed />} />
        <Route path="success" element={<SuccessPage />} />
        <Route path="search" element={<Search />} />
        <Route path="brand_overview" element={<Brand />} />
        <Route path="mission_and_values" element={<MissionAndVission />} />
        <Route path="why-us" element={<WhyUs />} />
        <Route path="distribution_channels" element={<Channels />} />

        {/* condition rendering */}
        <Route
          path="my-cart"
          element={userIsSignIn ? <MyCart /> : <GuestCart />}
        />
        {/* private route */}
        <Route
          path="Account"
          element={<PrivateRoute element={<Account />} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default UserRouting;
