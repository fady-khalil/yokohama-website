import { Routes, Route } from "react-router-dom";
import Home from "Pages/Home/Home";

import Header from "Layout/Header/Header";
import Footer from "Layout/Footer/Footer";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
