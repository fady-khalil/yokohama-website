import { useEffect, useState } from "react";
import Container from "Components/Container/Container";

import useGetData from "Hooks/Fetching/useGetData";
import IsError from "Components/RequestHandler/IsError";
import IsLoading from "Components/RequestHandler/IsLoading";
const Safety = () => {
  const { fetchData, error } = useGetData();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchData("yokohama/content/safety");
      setData(data);
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
  if (isError || error) return <IsError />;
  if (data) {
    return (
      <section className="mb-primary">
        <Container>
          <div className="py-secondary">
            <h1 className="rb-bold text-3xl text-center">Safety</h1>
          </div>

          <div className="flex flex-col gap-y-6">
            {data?.data?.map(({ image, title, text }, index) => (
              <div
                className="flex flex-col lg:flex-row lg:items-end lg:even:flex-row-reverse gap-10"
                key={index}
              >
                <div className="flex-1 min-full border-b-4 border-primary pb-14">
                  <h4 className="rb-bold text-2xl mb-4">{title}</h4>
                  <p className="rb-light">{text}</p>
                </div>
                <div className="flex-1">
                  <img className="w-full h-full" src={image} alt="" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }
};

export default Safety;
