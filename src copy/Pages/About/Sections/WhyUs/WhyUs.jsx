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
      <section className="my-secondary ">
        <Container>
          <div className="my-10 lg:mb-20 lg:mt-10 flex flex-col gap-y-4 items-center justify-center lg:w-1/2 mx-auto">
            <h5 className="text-2xl lg:text-4xl xxl:text-5xl rb-bold lg:text-center">
              Choosing Us is the Best for You
            </h5>
            <p className="lg:text-center">
              When consumers decide to make a purchase, it’s essential they get
              exactly what they expect for the value they’re paying—and this is
              where we make the difference. At HMG Holding, we don’t just meet
              expectations—we exceed them. Here’s why we stand out as the
              partner of choice:
            </p>
          </div>
        </Container>
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
                <div
                  className="text-lg why-us-content"
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
