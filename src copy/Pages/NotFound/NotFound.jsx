import React from "react";
import Container from "Components/Container/Container";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <section className="h-[60vh] md:h-[100vh]">
      <Container>
        <div className="h-[60vh] md:h-[100vh] flex justify-center md:items-center flex-col md:text-center">
          <h1 className="text-4xl font-bold "> 404 - Not Found</h1>
          <p className="text-xl mt-3 ">
            {" "}
            Oops! The page you are looking for might be in another castle.{" "}
            <br /> Let's get you back on track:{" "}
            <Link className="underline text-[#FF0000] font-bold" to="/">
              Home
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
};

export default NotFound;
