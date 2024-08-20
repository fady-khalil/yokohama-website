import React from "react";
import "./style.css";
import MainButton from "Components/Buttons/MainButton";
const SuccessPage = () => {
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
