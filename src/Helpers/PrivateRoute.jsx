import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserLoginContext } from "context/Auth/UserLoginContext";

const PrivateRoute = ({ element, ...rest }) => {
  const { userIsSignIn } = useContext(UserLoginContext);

  return userIsSignIn ? element : <Navigate to="/access-denied" />;
};

export default PrivateRoute;
