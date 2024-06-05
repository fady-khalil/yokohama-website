import { Link } from "react-router-dom";

const MainButton = ({ to, children, border }) => {
  return (
    <Link
      to={to}
      className={`px-10 py-3.5 border ${
        border ? "border-white" : "border-transparent"
      } text-white bg-primary text-xl font-medium`}
    >
      {children}
    </Link>
  );
};

export default MainButton;
