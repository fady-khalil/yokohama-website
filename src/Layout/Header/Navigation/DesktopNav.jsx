import { Link } from "react-router-dom";

const DesktopNav = ({ isHomePage }) => {
  return (
    <ul
      className={`hidden xsl:flex items-center  rb-medium uppercase gap-x-6  ${
        isHomePage ? "text-black" : "text-white"
      }`}
    >
      <li>
        <Link to={"/shop"}>Shop Tires</Link>
      </li>
      <span className="block bg-primary h-2 w-2 rounded-full"></span>
      <li>
        <Link to={"/shop"}>Shop Lubricants</Link>
      </li>
      <span className="block bg-primary h-2 w-2 rounded-full"></span>
      <li>
        <Link to={"/shop"}>Shop Batteries</Link>
      </li>
    </ul>
  );
};

export default DesktopNav;
