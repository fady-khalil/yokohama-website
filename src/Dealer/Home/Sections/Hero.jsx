import { useContext } from "react";
import { DealerLoginContext } from "context/Auth/DealerContext";
import Container from "Components/Container/Container";
import heroImage from "assests/hero.jpg";
import MainButton from "Components/Buttons/MainButton";
import WhiteButton from "Components/Buttons/WhiteButton";
const Hero = () => {
  const { dealerData } = useContext(DealerLoginContext);

  return (
    <section
      className="bg-cover bg-center h-[90vh] relative z-[10] overflow-hidden"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[#00000044] z-[-1]"></div>
      <Container className={"h-full"}>
        <div className="flex flex-col items-center justify-center h-full gap-y-14 lg:w-[70%] mx-auto">
          <div>
            <h1 className="rb-bold text-white text-4xl lg:text-5xl text-center mb-2">
              Hello {dealerData?.username}
            </h1>
            <p className="rb-bold text-white text-2xl lg:text-3xl text-center">
              You have {dealerData?.points}{" "}
              {dealerData?.points > 1 ? "points" : "point"} in your account
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <MainButton to={"/shop"}>Shop Your Products</MainButton>
            <WhiteButton to={"/gift"}>Redeem your Points</WhiteButton>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
