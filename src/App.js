import { useContext } from "react";
import { DealerLoginContext } from "context/Auth/DealerContext";
import { WhatsappLogo } from "@phosphor-icons/react";

//
import UserRouting from "Routing/UserRouting";
import DealerRouting from "Routing/DealerRouting";

const App = () => {
  const { dealerIsSignIn } = useContext(DealerLoginContext);

  return (
    <div className="App">
      <a
        href="https://wa.me/971553953784"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-2 bottom-24 bg-[#25D366] rounded-full p-2 z-[10000] animate-pulse"
      >
        <WhatsappLogo color="white" size={32} />
      </a>
      {dealerIsSignIn ? <DealerRouting /> : <UserRouting />}
    </div>
  );
};

export default App;
