import React from "react";
import Container from "Components/Container/Container";
import { useEffect, useState } from "react";
import useGetData from "Hooks/Fetching/useGetData";
import IsLoading from "Components/RequestHandler/IsLoading";
import IsError from "Components/RequestHandler/IsError";
const WhyUs = () => {
  // fetch data
  const { fetchData, error } = useGetData();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetchData(`yokohama/content/why_us`);
      setData(result?.data[0]?.why_us);
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
        <h5 className="text-5xl my-20 text-primary rb-bold text-center">
          Why us
        </h5>
        <Container>
          {data?.map(({ image, title, text }, index) => (
            <div
              key={index}
              className="flex flex-col gap-y-12 lg:flex-row gap-x-16 items-center lg:even:flex-row-reverse mb-14"
            >
              <div className="flex-1">
                <img className="w-full" src={image} alt="" />
              </div>
              <div className="flex-1">
                <p className="rb-bold text-3xl lg:text-4xl">{title}</p>
                <p
                  className="content"
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

export default WhyUs;
