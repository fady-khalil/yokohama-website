import { Link } from "react-router-dom";

const WhiteButton = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="px-10 py-3.5 bg-white text-font  border border-primary text-xl font-medium text-primary"
    >
      {children}
    </Link>
  );
};

export default WhiteButton;
