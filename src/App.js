import { Routes, Route } from "react-router-dom";
import ContextProvider from "context/ContextProvider";
import ScrollToTop from "Hooks/ScrollToTop";
import { useContext } from "react";
import { DealerLoginContext } from "context/Auth/DealerContext";

//
import UserRouting from "Routing/UserRouting";
import DealerRouting from "Routing/DealerRouting";

const App = () => {
  const { dealerIsSignIn } = useContext(DealerLoginContext);

  return (
    <div className="App">
      {dealerIsSignIn ? <DealerRouting /> : <UserRouting />}
    </div>
  );
};

export default App;
