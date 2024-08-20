import { useEffect, useState } from "react";
import useGetData from "Hooks/Fetching/useGetData";

const UseCountries = () => {
  const [countries, setCountries] = useState([]);
  const { fetchData } = useGetData();

  const getCountries = async () => {
    const data = await fetchData("yokohama/user/countries");
    setCountries(data?.data?.Countries);
  };

  useEffect(() => {
    getCountries();
  }, []); // Empty dependency array to run on mount

  return countries;
};

export default UseCountries;
