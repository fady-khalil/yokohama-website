import React from "react";
import Container from "Components/Container/Container";

import { useEffect, useState } from "react";
import useGetData from "Hooks/Fetching/useGetData";
import IsLoading from "Components/RequestHandler/IsLoading";
import IsError from "Components/RequestHandler/IsError";
const MissionAndVission = () => {
  // fetch data
  const { fetchData, error } = useGetData();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetchData(`yokohama/content/MissionAndValues`);
      setData(result?.data[0]?.MissionAndValues);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) return <IsLoading />;
  if (error) return <IsError />;
  if (data) {
    return (
      <section className="my-secondary">
        <h5 className="text-2xl lg:text-4xl xxl:text-5xl rb-bold text-center mb-10">
          Our Commitment to a Better Tomorrow
        </h5>
        <Container>
          {data?.map(({ image, title, text }, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row gap-x-16 gap-y-12 items-center lg:even:flex-row-reverse mb-14"
            >
              <div className="flex-1">
                <img className="w-full" src={image} alt="" />
              </div>
              <div className="flex-1">
                <div
                  className="rb-bold text-3xl lg:text-4xl"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <div
                  className="mt-4"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </div>
            </div>
          ))}
        </Container>
      </section>
    );
  }
};

export default MissionAndVission;
