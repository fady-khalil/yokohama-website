import Container from "Components/Container/Container";
import channelBg from "assests/about/channels/bg.jpg";

const Feature = ({ data }) => {
  return (
    <section
      className="py-primary"
      style={{ backgroundImage: `url(${channelBg})` }}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-16 items-center justify-between">
          {data?.map(({ title, logo, num }, index) => (
            <div
              className="flex-1  flex flex-col items-center justify-center"
              key={index}
            >
              <div className="flex-1 mb-3">
                <img className="w-[50%] mx-auto" src={logo} alt="" />
              </div>
              <p className="text-3xl lg:text-5xl rb-bold text-primary">{num}</p>
              <p className="text-white">{title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Feature;
