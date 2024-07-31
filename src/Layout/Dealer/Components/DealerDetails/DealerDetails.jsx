import { useContext } from "react";
import { User } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { DealerLoginContext } from "context/Auth/DealerContext";
import Spinner from "Components/RequestHandler/Spinner";
const DealerDetails = ({ data }) => {
  const { handleDealderLogout, dealerLoading } = useContext(DealerLoginContext);
  return (
    <div className="relative  px-6 text-white bg-primary hidden lg:flex items-center py-4 group  items-center justify-center min-w-[10rem] max-w-[fit-content]">
      <button className="flex items-center gap-x-3  items-center">
        <User size={20} weight="fill" />
        <p>{data?.username}</p>
      </button>

      <ul
        className={`absolute w-full h-auto bg-primary text-white py-5 px-3 flex flex-col gap-5 top-full left-0 border-t text-center transition ease-in duration z-[1000] text-sm  uppercase translate-y-[20%] opacity-100 select-none invisible group-hover:translate-y-[0%] group-hover:opacity-1 group-hover:select-auto group-hover:visible`}
      >
        <li>
          <Link className="hover:underline " to={"/my-orders"}>
            My Orders
          </Link>
        </li>
        <li>
          <Link className="hover:underline ">Edit Account</Link>
        </li>
        <li>
          <button
            onClick={() => handleDealderLogout()}
            className="hover:underline uppercase "
          >
            {dealerLoading && <Spinner />}
            {!dealerLoading && <p>Logout</p>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DealerDetails;
