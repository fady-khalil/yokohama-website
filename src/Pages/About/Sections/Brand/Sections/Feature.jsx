import Container from "Components/Container/Container";
import channelBg from "assests/about/channels/bg.jpg";

const Feature = ({ data }) => {
  return (
    <section
      className="py-primary"
      style={{ backgroundImage: `url(${channelBg})` }}
    >
      <Container>
        <div className="flex flex-col lg:flex-row gap-y-10 items-center justify-between">
          {data?.map(({ text, logo, num }, index) => (
            <div
              className="flex-1 lg:even:mt-32 flex flex-col items-center justify-center"
              key={index}
            >
              <img className="flex-1" src={logo} alt="" />
              <p className="text-4xl lg:text-5xl rb-bold text-primary">{num}</p>
              <p className="text-white">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Feature;
