import myCartData from "Constant/DealerCart";
import { X, Trash } from "@phosphor-icons/react";
import cat from "assests/cat-image.jpg";
import { DealerCartContext } from "context/DealerCart/DealerCartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartModalIsVisible, handleCloseCartModalVisible } =
    useContext(DealerCartContext);
  return (
    <div
      className={`h-[100vh] w-[30vw] top-0 bottom-0 right-0 bg-white fixed border-l border-black flex flex-col justify-between transition ease-in duration-300 z-[10000] ${
        cartModalIsVisible ? "translate-x-[0]" : "translate-x-[100%]"
      }`}
    >
      <div className="flex items-center justify-between py-4 border-b border-black mb-4  px-8">
        <p className="text-lg rb-bold">My Cart</p>
        <button onClick={handleCloseCartModalVisible}>
          <X />
        </button>
      </div>

      <div className="flex flex-col gap-y-6  px-8 max-h-[70vh] overflow-y-scroll">
        <Link
          onClick={handleCloseCartModalVisible}
          to={"cart-detailed"}
          className="flex items-center justify-between  border-b pb-2"
        >
          <div className="rb-bold">
            <img className="w-24" src={cat} alt="" />
            <p>Geolander - AT/GT015</p>
            <p>25$</p>
          </div>
          <div className="flex-1">
            <div className="w-[55%] px-5 py-1 border border-black flex items-center justify-between mx-auto gap-x-3">
              <button>+</button>
              <p>0</p>
              <button>-</button>
            </div>
          </div>

          <button>
            <Trash weight="fill" size={24} />
          </button>
        </Link>
        <Link
          onClick={handleCloseCartModalVisible}
          to={"/cart-detailed"}
          className="flex items-center justify-between  border-b pb-2"
        >
          <div className="rb-bold">
            <img className="w-24" src={cat} alt="" />
            <p>Geolander - AT/GT015</p>
            <p>25$</p>
          </div>
          <div className="flex-1">
            <div className="w-[55%] px-5 py-1 border border-black flex items-center justify-between mx-auto gap-x-3">
              <button>+</button>
              <p>0</p>
              <button>-</button>
            </div>
          </div>

          <button>
            <Trash weight="fill" size={24} />
          </button>
        </Link>
      </div>

      <div className="mt-auto">
        <div className="bg-dark py-5 px-3 flex items-center justify-between text-white rb-bold">
          <p>Estimated Total</p>
          <p>5000$</p>
        </div>
        <div className="bg-primary py-5 px-3 flex items-center justify-center text-white rb-bold">
          <p className="uppercase">continue to checkout</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
