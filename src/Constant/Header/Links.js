import { useState, useEffect } from "react";
import useGetData from "Hooks/Fetching/useGetData";
import bannerImage from "assests/tires-shop.jpg";

import shopImage from "assests/Banner/shop.jpg";
import saftyImage from "assests/Banner/safty.jpg";
import productsImage from "assests/Banner/products.jpg";
import news from "assests/Banner/news.JPG";
import aboutImage from "assests/Banner/about-us.jpg";

const GetLinks = () => {
  const [data, setData] = useState();
  const [aboutData, setAboutData] = useState([]);
  const [dataContent, setDataContent] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { fetchData, error } = useGetData();
  const [productsData, setProductsData] = useState();

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

  const getProducts = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchData("brand/by/categories/yokohama");
      setProductsData(data?.categories);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    getProducts();
  }, []);

  const updatedNavLinks = [
    {
      banner: shopImage,
      text: "Shop",
      mega: true,
      pages: data,
    },

    {
      banner: aboutImage,
      text: "About us",
      mega: true,
      about: true,
      pages: [
        {
          name: "Company Overview",
          slug: "brand_overview",
        },
        {
          name: "Why us",
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
        // {
        //   name: "Find a dealer",
        //   slug: "dealers",
        // },
      ],
    },
    {
      text: "Our Products",
      banner: productsImage,
      pages: productsData,
      mega: true,
      products: true,
    },
    // Dynamic rendering of dataContent
    // ...(dataContent?.map((content) => ({
    //   banner: saftyImage,
    //   dynamic: true,
    //   text: content.name, // Use the name of each content as text
    //   mega: true,
    //   pages: content.sub_cat_child || [], // Use sub_cat_child as pages
    // })) || []),

    {
      text: "News & events",
      url: "/news-and-event",
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
