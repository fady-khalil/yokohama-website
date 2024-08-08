import Container from "Components/Container/Container";

import "./Style.css";
const IsLoading = () => {
  return (
    <div className=" h-[100vh]  bg-white w-full">
      <Container className={"h-full"}>
        <div className="loader">
          <div className="circle one"></div>
          <div className="circle two"></div>
          <div className="circle three"></div>
        </div>
      </Container>
    </div>
  );
};

export default IsLoading;
