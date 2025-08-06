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
    // {
    //   name: "About",
    //   mega: true,
    //   about: true,
    //   pages: [
    //     {
    //       name: "Brand Overview",
    //       slug: "brand_overview",
    //     },
    //     {
    //       name: "ًًWhy us",
    //       slug: "why-us",
    //     },
    //     {
    //       name: "Mission and Values",
    //       slug: "mission_and_values",
    //     },
    //     {
    //       name: "Distribution Channels",
    //       slug: "distribution_channels",
    //     },
    //   ],
    // },

    {
      name: "Safety",
      path: "safety",
    },
    {
      name: "Contact",
      path: "contact-us",
    },

    {
      name: "Original Equipment",
      path: "original-equipment",
    },
    {
      name: "News and Events",
      path: "news-and-event",
    },
  ];
};

export default FooterLinks;
