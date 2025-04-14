import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetData from "Hooks/Fetching/useGetData";
import IsLoading from "Components/RequestHandler/IsLoading";
import IsError from "Components/RequestHandler/IsError";

import Header from "./Header/Header";
import Landing from "./Landing/Landing";

const Content = () => {
  const { slug } = useParams();
  const { fetchData, error } = useGetData();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetchData(
        `yokohama/categories/webContent/slug/${slug}`
      );
      setData(result?.data[0]);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [slug]);

  if (isLoading) return <IsLoading />;
  if (error) return <IsError />;
  if (data) {
    return (
      <main>
        <Header cat={data?.category_id} title={data?.content_title} />
        <Landing text={data?.content_Text} title={data?.content_title} />
      </main>
    );
  }
};

export default Content;
