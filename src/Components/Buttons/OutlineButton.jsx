import { Link } from "react-router-dom";

const OutlineButton = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="px-10 py-3.5 text-font  border border-primary text-xl font-medium"
    >
      {children}
    </Link>
  );
};

export default OutlineButton;
