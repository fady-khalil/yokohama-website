import { useContext, useState } from "react";
import Container from "Components/Container/Container";
import brand1 from "assests/brand-cart.jpg";
import { Trash } from "@phosphor-icons/react";
import MainButton from "Components/Buttons/MainButton";
import { DealerCartContext } from "context/DealerCart/DealerCartContext";
import EmptyCart from "Components/Screens/EmptyCart";
import Spinner from "Components/RequestHandler/Spinner";
import { Link } from "react-router-dom";
import usePostToken from "Hooks/Fetching/usePostToken";
import { DealerLoginContext } from "context/Auth/DealerContext";
import { useNavigate } from "react-router-dom";
const CartReview = () => {
  const { dealerToken } = useContext(DealerLoginContext);
  const {
    displayProductHandler,
    displayProduct,

    cart,
    cartIsLoading,

    AddToCart,
    addToCartLoading,

    removeFromCart,
    loadingItems,

    updateCart,
    clearCart,
  } = useContext(DealerCartContext);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      updateCart(productId, quantity);
    }
  };
  const calculateSubtotal = () => {
    return cart?.cart_items?.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const { postData } = usePostToken();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const confirmOrderHandler = async () => {
    try {
      setIsLoading(true);
      const data = await postData(
        `/yokohama/cart/confirm?&cart_id=${cart?.cart_id}`,
        dealerToken
      );
      if (data?.is_success) {
        clearCart();
        navigate("/Success-Page");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  if (cartIsLoading)
    return (
      <div className="flex items-center flex-col mt-14 h-[40vh]">
        <Spinner />
        <p className="mt-6">Loading cart data...</p>
      </div>
    );

  if (cart) {
    return (
      <div className="py-secondary">
        <Container>
          {cart?.cart_items?.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="flex-[2] flex flex-col gap-y-3">
                {cart?.cart_items.map(
                  (
                    { name, image, price, currency, quantity, product_id },
                    index
                  ) => (
                    <div
                      className="flex flex-wrap gap-6 items-center justify-between w-full border-b pb-3"
                      key={index}
                    >
                      <img className="w-24" src={image} alt="" />
                      <div>
                        <p className=" min-w-[fit-content] font-medium">
                          {name}
                        </p>
                        <span className="mt-2 flex items-center gap-x-2">
                          <p>{price}</p>
                          <p>{currency}</p>
                        </span>
                      </div>
                      <div className="border py-2 px-4 flex items-center justify-between gap-x-6">
                        <button
                          onClick={() =>
                            handleQuantityChange(product_id, quantity + 1)
                          }
                        >
                          +
                        </button>
                        <p>{quantity}</p>
                        <button
                          onClick={() =>
                            handleQuantityChange(product_id, quantity - 1)
                          }
                        >
                          -
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product_id)}
                        className=" flex items-center justify-center"
                      >
                        {loadingItems[product_id] ? (
                          <Spinner />
                        ) : (
                          <Trash weight="fill" size={26} />
                        )}
                      </button>
                    </div>
                  )
                )}
              </div>
              <div className="flex-1 h-fit lg:sticky lg:top-10 bg-dark border-t-4 border-primary p-6">
                {/* <div className="border-b border-white pb-4">
                  <label className="flex items-center space-x-2 ">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-white"
                    />
                    <span className={"text-white"}>Use my credits (200$)</span>
                  </label>
                  <p className="text-[#aaa]">
                    each credit is equivalent to 1 litres
                  </p>
                </div> */}

                <div className="border-b border-white pb-4">
                  <p className="text-white text-xl rb-bold mt-4 mb-2">
                    Order Summuary
                  </p>

                  <div className="mt-3">
                    <span className="flex items-center justify-between text-[#ddd]">
                      <p>Subtotal</p>
                      <p>{calculateSubtotal()}$</p>
                    </span>
                    <span className="flex items-center justify-between text-[#ddd]">
                      <p>Tax Vat</p>
                      <p>
                        {cart?.invoice_details[0]?.amount_tax}{" "}
                        {cart?.invoice_details[0]?.currency}
                      </p>
                    </span>
                    <span className="flex items-center justify-between text-[#ddd]">
                      <p>Shipping Charge</p>
                      <p>0</p>
                    </span>
                    <span className="flex items-center justify-between text-[#ddd]">
                      <p>Discount 10%</p>
                      <p>pending</p>
                    </span>
                  </div>
                </div>

                <div className="pb-4">
                  <span className="flex items-center justify-between">
                    <p className="text-white text-xl rb-bold mt-4 mb-2 uppercase">
                      Total
                    </p>
                    <p className="text-white text-xl rb-bold mt-4 mb-2">
                      {cart?.invoice_details[0]?.amount_total}{" "}
                      {cart?.invoice_details[0]?.currency}
                    </p>
                  </span>
                  <p className="text-[#aaa] text-sm">
                    By completing this order you will earn 520 pts
                  </p>
                  <div className="mt-6 w-full flex-1 flex">
                    <MainButton
                      isLoading={isLoading}
                      onClick={confirmOrderHandler}
                      isSmall={true}
                    >
                      Continue to checkout
                    </MainButton>
                  </div>
                  <Link
                    to={"/shop"}
                    className="text-white rb-bold text-center underline mt-3 mx-auto flex items-center justify-center"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <EmptyCart />
          )}
        </Container>
      </div>
    );
  }
};

export default CartReview;
