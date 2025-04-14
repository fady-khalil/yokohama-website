import image from "assests/empty-cart.png";

const EmptyCart = () => {
  return (
    <div className="w-full h-[300px] lg:h-[500px] ">
      <img className="h-[300px] lg:h-[500px] mx-auto" src={image} alt="" />
    </div>
  );
};

export default EmptyCart;
