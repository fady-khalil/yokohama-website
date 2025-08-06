import { useEffect, useState } from "react";
import Container from "Components/Container/Container";
import { Link } from "react-router-dom";
import useGetData from "Hooks/Fetching/useGetData";
import IsError from "Components/RequestHandler/IsError";
import IsLoading from "Components/RequestHandler/IsLoading";
import Pagination from "Dealer/Shop/Components/Pagination";
const NewAndEvent = () => {
  const { fetchData, error } = useGetData();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
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

    getData();
  }, []);

  if (isLoading) return <IsLoading />;
  if (isError || error) return <IsError />;
  if (data) {
    // Calculate pagination
    const totalItems = data?.data?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Get current page items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems =
      data?.data?.slice(indexOfFirstItem, indexOfLastItem) || [];

    // Handle page change
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
      <main className="my-secondary lg:my-primary">
        <Container>
          <div className="my-secondary">
            <h1 className="text-center text-3xl rb-bold">News And Events</h1>
          </div>
          <div className="grid grid-col-1 md:grid-cols-2 gap-6 relative">
            {currentItems.map(({ title, image, date, slug }, index) => (
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

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </Container>
      </main>
    );
  }
};

export default NewAndEvent;
