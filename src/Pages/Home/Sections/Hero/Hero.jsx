import Container from "Components/Container/Container";
import bg from "assests/find-your-tires-bg.jpg";

import Slider from "./Slider";
const Hero = ({ data }) => {
  return (
    <section
      style={{ backgroundImage: `url(${bg})` }}
      className="h-[80vh] relative bg-dark z-[10]"
    >
      <Container className="h-full">
        <Slider data={data} />
      </Container>
    </section>
  );
};

export default Hero;
