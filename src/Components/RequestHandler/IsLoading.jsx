import Container from "Components/Container/Container";

import "./Style.css";
const IsLoading = () => {
  return (
    <div className=" h-[100vh]  bg-white w-full">
      <Container className={"h-full"}>
        <div class="loader">
          <div class="circle one"></div>
          <div class="circle two"></div>
          <div class="circle three"></div>
        </div>
      </Container>
    </div>
  );
};

export default IsLoading;
