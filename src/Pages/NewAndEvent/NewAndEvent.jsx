import { useEffect, useState } from "react";
import Container from "Components/Container/Container";
import { Link } from "react-router-dom";
import useGetData from "Hooks/Fetching/useGetData";
import IsError from "Components/RequestHandler/IsError";
import IsLoading from "Components/RequestHandler/IsLoading";
const NewAndEvent = () => {
  const { fetchData, error } = useGetData();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchData("yokohama/content/news");
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
      <main className="my-secondary lg:my-primary">
        <Container>
          <div className="my-secondary">
            <h1 className="text-center text-3xl rb-bold">News And Events</h1>
          </div>
          <div className="grid grid-col-1 md:grid-cols-2 gap-6 relative">
            {data?.data?.map(({ title, image, date, slug }, index) => (
              <Link
                to={`/news-and-event/${slug}`}
                className="h-[45vh] about-bg p-3 md:p-6 lg:p-10 flex flex-col justify-end relative z-[10]"
                key={index}
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-[#00000044] z-[1]"></div>

                <p className="rb-bold text-white text-xl mb-2 w-1/2 relative z-[10]">
                  {title}
                </p>
                <p className="rb-bold text-white relative z-[10]">{date}</p>
              </Link>
            ))}
          </div>
        </Container>
      </main>
    );
  }
};

export default NewAndEvent;
