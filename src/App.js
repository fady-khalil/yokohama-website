import { Routes, Route } from "react-router-dom";
import Home from "Pages/Home/Home";
import About from "Pages/About/About";
import Header from "Layout/Header/Header";
import Footer from "Layout/Footer/Footer";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="about-us" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
