import { useState, useEffect } from "react";
import useGetData from "Hooks/Fetching/useGetData";
import bannerImage from "assests/tires-shop.jpg";

const GetLinks = () => {
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

  const updatedNavLinks = [
    {
      banner: bannerImage,
      text: "Shop",
      mega: true,
      pages: data,
    },
    {
      banner: bannerImage,
      text: "About",
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
    ...(dataContent?.map((content) => ({
      banner: bannerImage,
      dynamic: true,
      text: content.name, // Use the name of each content as text
      mega: true,
      pages: content.sub_cat_child || [], // Use sub_cat_child as pages
    })) || []),
    {
      text: "Promotion",
      url: "/",
    },
    {
      text: "Tire Finder",
      url: "/",
    },
  ];

  return updatedNavLinks;
};

export default GetLinks;

// MDE
// EUROPE
// AMERCA
// market maker => data for tiers
// 1010 tires
// sizemytire
// equivilants tires size also to but teh data
