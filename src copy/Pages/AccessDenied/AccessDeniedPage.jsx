import Container from "Components/Container/Container";
import React from "react";
import { Link } from "react-router-dom";

const AccessDeniedPage = () => {
  return (
    <div className="h-[60vh] md:h-[100vh]">
      <Container>
        <div className="h-[60vh] md:h-[100vh] flex justify-center md:items-center flex-col md:text-center">
          <h1 className="text-4xl font-bold">Access Denied</h1>
          <p className="text-xl mt-3">
            You don't have access to view this page. To continue Please.
          </p>
          <div className="mt-10 flex item-cener gap-x-10">
            <Link
              className="text-xl underline text-[#FF0000] font-bold"
              to="/login"
            >
              Sign in
            </Link>
            <p className="text-xl ">or</p>
            <Link to="/" className="text-xl underline text-[#FF0000] font-bold">
              Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AccessDeniedPage;
