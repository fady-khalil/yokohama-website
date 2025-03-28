import Container from "Components/Container/Container";
import channelBg from "assests/about/channels/bg.jpg";

import { useEffect, useState } from "react";
import useGetData from "Hooks/Fetching/useGetData";
import IsLoading from "Components/RequestHandler/IsLoading";
import IsError from "Components/RequestHandler/IsError";
const Channels = () => {
  // fetch data
  const { fetchData, error } = useGetData();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetchData(`yokohama/content/distributionchannels`);
      setData(result?.data[0]?.distributionchannels_ids);
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
        <Container>
          <div className="my-10 lg:mb-20 lg:mt-10 flex flex-col gap-y-4 items-center justify-center lg:w-1/2 mx-auto">
            <h5 className="text-2xl lg:text-4xl xxl:text-5xl rb-bold lg:text-center">
              Connecting You Everywhere
            </h5>
            <p className="lg:text-center">
              At HMG Holding, we’ve built a wide-reaching network to ensure our
              products are easily accessible, no matter where you are or how you
              prefer to shop. Our diverse distribution channels ensure seamless
              delivery and availability across a range of sectors:
            </p>
          </div>
          <div
            className="py-24 mt-12  gap-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-between"
            style={{ backgroundImage: `url(${channelBg})` }}
          >
            {data?.map(({ logo, title }, index) => (
              <div
                className="flex flex-col gap-y-2 items-center text-white"
                key={index}
              >
                <img
                  className="w-20 h-20 mx-auto object-contain"
                  src={logo}
                  alt=""
                />

                <div
                  className="rb-medium"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }
};

export default Channels;
