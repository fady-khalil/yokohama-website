import { useContext, useEffect } from "react";
import "./style.css";
import MainButton from "Components/Buttons/MainButton";
import useGetDataToken from "Hooks/Fetching/useGetDataToken.jsx";
import { UserCartContext } from "context/User/CartContext";
import { UserLoginContext } from "context/Auth/UserLoginContext.js";
import { DealerCartContext } from "context/DealerCart/DealerCartContext";
const SuccessPage = () => {
  const { clearCart } = useContext(UserCartContext);
  const { fetchData } = useGetDataToken();
  const { userToken } = useContext(UserLoginContext);
  const { clearCart: clearDealerCart } = useContext(DealerCartContext);

  const submitPayment = async () => {
    const paymentRef = localStorage.getItem("payment_ref");
    const orderId = localStorage.getItem("order_id");
    const data = await fetchData(
      `yokohama/areeba/payment/paid/${paymentRef}/${orderId}`,
      userToken
    );

    clearCart();
    clearDealerCart();
  };
  useEffect(() => {
    submitPayment();
  }, []);

  return (
    <div className="h-[80vh] flex flex-col justify-center">
      <div class="success-checkmark mx-auto ">
        <div class="check-icon">
          <span class="icon-line line-tip"></span>
          <span class="icon-line line-long"></span>
          <div class="icon-circle"></div>
          <div class="icon-fix"></div>
        </div>
      </div>

      <div>
        <p className="text-center text-2xl w-1/2 mx-auto">
          Your order has been successfully placed! <br /> Thank you for shopping
          with us.
        </p>
      </div>

      <div className="flex items-center justify-center w-max mx-auto mt-10">
        <MainButton to={"/"} isSmall={true}>
          Go Home
        </MainButton>
      </div>
    </div>
  );
};

export default SuccessPage;
