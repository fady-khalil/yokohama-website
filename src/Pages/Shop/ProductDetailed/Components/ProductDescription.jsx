import image from "assests/details/2.jpg";
import Container from "Components/Container/Container";
const ProductDescription = () => {
  return (
    <div className="py-secondary">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-y-6 gap-x-16">
          <div className="flex-1">
            <h2 className="rb-bold text-3xl captialize">
              Bold off-road attitude
            </h2>
            <p className="text-sm mt-2 lg:w-3/4 rb-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit amet
              culpa, expedita, sint in harum voluptates consequatur impedit
              voluptas debitis, quisquam perferendis. Ullam repellat labore
              rerum neque voluptate vitae odio delectus, ipsa provident incidunt
              quis dolores totam quod necessitatibus eius.
            </p>
          </div>
          <div className="flex-1">
            <img src={image} alt="" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDescription;
