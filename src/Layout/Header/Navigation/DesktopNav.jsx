import { Link } from "react-router-dom";

const DesktopNav = () => {
  return (
    <ul className="flex items-center  gap-x-6  text-black">
      <li>
        <Link to={"/shop"}>Shop Tires</Link>
      </li>
      <li>
        <Link to={"/shop"}>Shop Lubricants</Link>
      </li>
      <li>
        <Link to={"/shop"}>Shop Batteries</Link>
      </li>
    </ul>
  );
};

export default DesktopNav;
