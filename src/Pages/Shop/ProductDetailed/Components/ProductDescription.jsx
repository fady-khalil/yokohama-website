import Container from "Components/Container/Container";
import fixImageUrl from "Helpers/FixImageUrl.js";
const ProductDescription = ({ data }) => {
  return (
    <div className="py-secondary">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-y-6 gap-x-16">
          <div className="flex-1">
            <h2 className="rb-bold text-3xl captialize">{data?.title}</h2>

            <p
              className="text-sm mt-2 lg:w-3/4 rb-medium"
              dangerouslySetInnerHTML={{ __html: data?.text }}
            />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img
              className="w-3/4 h-3/4"
              src={fixImageUrl(data?.image)}
              alt=""
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDescription;
