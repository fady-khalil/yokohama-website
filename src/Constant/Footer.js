// const footerLinks = [
//   {
//     name: "Tires",
//     path: "/shop",
//   },
//   {
//     name: "Lubricants",
//     path: "/shop",
//   },
//   {
//     name: "Batteries",
//     path: "/shop",
//   },
//   {
//     name: "About",
//     path: "/about-us",
//   },
//   {
//     name: "Dealers",
//     path: "/dealers",
//   },
//   {
//     name: "Safety",
//     path: "safety",
//   },
//   {
//     name: "Contact",
//     path: "contact-us",
//   },
//   {
//     name: "Videos",
//     path: "",
//   },
//   {
//     name: "Original Equipment",
//     path: "original-equipment",
//   },
//   {
//     name: "News and news",
//     path: "news-and-event",
//   },
// ];

// export default footerLinks;

import { useEffect, useState } from "react";
import useGetData from "Hooks/Fetching/useGetData";

const FooterLinks = () => {
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

  return [
    {
      mega: true,
      list: data,
    },
    {
      name: "About",
      path: "/about-us",
    },
    {
      name: "Dealers",
      path: "/dealers",
    },
    {
      name: "Safety",
      path: "safety",
    },
    {
      name: "Contact",
      path: "contact-us",
    },
    {
      name: "Videos",
      path: "",
    },
    {
      name: "Original Equipment",
      path: "original-equipment",
    },
    {
      name: "News and news",
      path: "news-and-event",
    },
  ];
};

export default FooterLinks;
