import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useGetData from "Hooks/Fetching/useGetData";
import IsLoading from "Components/RequestHandler/IsLoading";
import IsError from "Components/RequestHandler/IsError";
import Container from "Components/Container/Container";
const NewsDetailed = () => {
  const { slug } = useParams();
  const { fetchData, error } = useGetData();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      console.log("Fetching data for slug:", slug);
      const data = await fetchData(`yokohama/content/news/${slug}`);
      setData(data?.data[0]);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);
  if (isLoading) return <IsLoading />;
  if (isError || error) return <IsError />;
  if (data) {
    return (
      <section className="my-primary">
        <Container>
          <div className="flex items-center gap-x-20">
            <div className="flex-1">
              <img className="w-full" src={data?.image} alt="" />
            </div>
            <div className="flex-1">
              <p>{data?.date}</p>
              <h2 className="text-3xl mt-4 mb-6 font-bold">{data?.title}</h2>

              <p
                className="text-sm text-[#555] leading-loose"
                dangerouslySetInnerHTML={{ __html: data?.content }}
              />
            </div>
          </div>
        </Container>
      </section>
    );
  }
};

export default NewsDetailed;
