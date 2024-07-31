import { useContext } from "react";
import Spinner from "Components/RequestHandler/Spinner";
import { UserLoginContext } from "context/Auth/UserLoginContext";
const Logout = () => {
  const { handleUserLogout } = useContext(UserLoginContext);
  return (
    <button onClick={handleUserLogout}>
      <Spinner />
      <p>Logout</p>
    </button>
  );
};

export default Logout;
