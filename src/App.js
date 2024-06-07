import { Routes, Route } from "react-router-dom";
import ContextProvider from "context/ContextProvider";
import Header from "Layout/Header/Header";
import Footer from "Layout/Footer/Footer";
// pages
import Home from "Pages/Home/Home";
import About from "Pages/About/About";

// modals
import AuthModal from "Pages/Auth/AuthModal";
import ForgetPasswordModal from "Pages/Auth/ForgetPassword/ForgetPasswordModal";
import DealerSiginModal from "Pages/Auth/DealerSigin/DealerSiginModal";
const App = () => {
  return (
    <div className="App">
      <ContextProvider>
        <AuthModal />
        <ForgetPasswordModal />
        <DealerSiginModal />
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="about-us" element={<About />} />
        </Routes>
        <Footer />
      </ContextProvider>
    </div>
  );
};

export default App;
