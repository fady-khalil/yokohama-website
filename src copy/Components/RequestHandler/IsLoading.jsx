import Container from "Components/Container/Container";

import "./Style.css";
const IsLoading = ({ isSmall }) => {
  return (
    <div className={`${isSmall ? "h-[30vh] " : "h-[100vh]"}  bg-white w-full `}>
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
