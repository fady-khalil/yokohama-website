import { useEffect, useState } from "react";
import useGetData from "Hooks/Fetching/useGetData";

const FooterLinks = () => {
  const [data, setData] = useState();
  const [aboutData, setAboutData] = useState([]);
  const [dataContent, setDataContent] = useState();
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

  const getContentData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchData("yokohama/content/categories");
      setDataContent(data?.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getAboutData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchData("yokohama/content/AboutUs");
      setAboutData(data?.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    getContentData();
    getAboutData();
  }, []);

  return [
    {
      mega: true,
      list: data,
    },
    {
      name: "About",
      mega: true,
      about: true,
      pages: [
        {
          name: "Brand Overview",
          slug: "brand_overview",
        },
        {
          name: "ًًWhy us",
          slug: "why-us",
        },
        {
          name: "Mission and Values",
          slug: "mission_and_values",
        },
        {
          name: "Distribution Channels",
          slug: "distribution_channels",
        },
      ],
    },
    // Dynamic rendering of dataContent
    // ...(dataContent?.map((content) => ({
    //   dynamic: true,
    //   text: content.name, // Use the name of each content as text
    //   mega: true,
    //   pages: content.sub_cat_child || [], // Use sub_cat_child as pages
    // })) || []),
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
