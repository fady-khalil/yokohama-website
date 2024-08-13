import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetData from "Hooks/Fetching/useGetData";
import Spinner from "Components/RequestHandler/Spinner";

const DesktopNav = ({ isHomePage }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { fetchData, error } = useGetData();

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchData("yokohama/ctegories/all");
      setData(data?.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ul
      className={`hidden xsl:flex items-center  rb-medium uppercase gap-x-6  ${
        isHomePage ? "text-black" : "text-white"
      }`}
    >
      {isLoading && <Spinner />}
      {isError ||
        (error && (
          <p className="font-[400] text-sm text-red-400">
            Something went wrong. Don't worry, we're on it. Please try again
            later.
          </p>
        ))}
      {!isLoading &&
        data?.map(({ name, id }, index) => (
          <div
            className="xsl:flex items-center  rb-medium uppercase gap-x-6"
            key={index}
          >
            <li>
              <Link to={`/shop/${id}`}>{`Shop ${name}`}</Link>
            </li>
            <span
              className={` bg-primary h-2 w-2 rounded-full ${
                index === data?.length - 1 ? "hidden" : "block"
              }`}
            ></span>
          </div>
        ))}
    </ul>
  );
};

export default DesktopNav;
