import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "../AuthButtons/Login/LoginButton";
import DealerLoginButton from "../AuthButtons/DealerLogin/DealerLoginButton";

const UserMenu = ({ userIsSignIn, userData, isHomePage }) => {
  return (
    <div className="flex items-center gap-4">
      {userIsSignIn ? (
        <Link
          title="check your account"
          to="/Account"
          className="hover:underline px-6 py-2"
        >
          Hello, {userData?.username}
        </Link>
      ) : (
        <>
          <LoginButton isHomePage={isHomePage} />
          <DealerLoginButton />
        </>
      )}
    </div>
  );
};

export default UserMenu;
