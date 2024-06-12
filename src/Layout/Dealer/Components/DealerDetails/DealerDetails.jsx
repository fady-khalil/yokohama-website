import { useContext } from "react";
import { User } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { DealerLoginContext } from "context/Auth/DealerContext";
const DealerDetails = ({ isVisible, onMouseEnter, onMouseLeft }) => {
  const { handleDealderLogout } = useContext(DealerLoginContext);
  return (
    <div
      onMouseEnter={onMouseEnter}
      className="relative  px-8 text-white bg-primary hidden lg:flex items-center py-5  items-center"
    >
      <button
        onMouseEnter={onMouseEnter}
        className="flex items-center gap-x-2  items-center"
      >
        <User weight="fill" />
        <p>user Name</p>
      </button>

      <ul
        onMouseLeave={onMouseLeft}
        className={`absolute w-full h-auto bg-primary text-white py-5 px-3 flex flex-col gap-5 top-full left-0 border-t text-center transition ease-in duration z-[1000] text-sm  uppercase ${
          isVisible
            ? "translate-y-[0%] opacity-1 select-auto visible"
            : "translate-y-[20%] opacity-0 select-none invisible"
        }`}
      >
        <li>Credits:200$</li>
        <li>
          <Link to={"/my-orders"}>My Orders</Link>
        </li>
        <li>
          <Link>Edit Account</Link>
        </li>
        <li>
          <button onClick={() => handleDealderLogout()} className="underline">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DealerDetails;
