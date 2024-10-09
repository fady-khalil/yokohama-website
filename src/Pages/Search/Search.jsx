import Container from "Components/Container/Container";
import { useContext, useState, useEffect } from "react";
import { UserLoginContext } from "context/Auth/UserLoginContext";
import Spinner from "Components/RequestHandler/Spinner";
import { MagnifyingGlass } from "@phosphor-icons/react";
import BASE_URL from "Utilities/BASE_URL";
import searchIcon from "assests/search.png";
import IsLoading from "Components/RequestHandler/IsLoading";
import { Link } from "react-router-dom";
import searchFailed from "assests/search-failed.png";
import image1 from "assests/product-1-removebg-preview.png";

const Search = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [prevSearchInput, setPrevSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { userToken, userIsSignIn } = useContext(UserLoginContext);
  const [searchPerformed, setSearchPerformed] = useState(false); // New state to track search performed

  // Debouncing: Set a delay of 2 seconds before triggering search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchInput && searchInput !== prevSearchInput) {
        fetchSearchResult();
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput, currentPage]);

  // Function to fetch search results
  const fetchSearchResult = async () => {
    setIsLoading(true);
    setIsError(false);
    setSearchPerformed(true); // Mark search as performed

    try {
      const response = await fetch(
        `${BASE_URL}/Yokohama/search?search_query=${searchInput}&page=${currentPage}`
      );

      if (!response.ok) {
        setIsError(true);
      }

      const data = await response.json();
      setData(data);
      setTotalPages(data.total_pages || 1);
      setPrevSearchInput(searchInput);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change for the search input field
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1); // Reset page to 1 on new search
  };

  // Clear search and reset state
  const handleClearSearch = () => {
    setSearchInput("");
    setData([]); // Reset the search results
    setPrevSearchInput(""); // Reset the previous search input
    setCurrentPage(1); // Reset page
    setTotalPages(1); // Reset pagination
    setSearchPerformed(false); // Reset search performed flag
  };

  // Pagination controls
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchSearchResult(); // Trigger search when moving to the next page
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      fetchSearchResult(); // Trigger search when moving to the previous page
    }
  };

  console.log(data);

  return (
    <main>
      <section className="">
        <Container>
          <div className="border border-black rounded-lg flex items-stretch gap-x-2 mt-16 lg:mt-32 lg:w-1/2 mx-auto">
            <input
              placeholder="Search..."
              className="flex-1 outline-0 px-2 rounded-lg"
              type="search"
              value={searchInput}
              onChange={handleInputChange}
            />
            <button
              onClick={fetchSearchResult} // Optional for immediate search on button click
              className="rounded-tr-lg rounded-br-lg bg-primary flex items-center justify-center text-3xl p-2 text-white min-h-full"
            >
              {isLoading ? <Spinner /> : <MagnifyingGlass />}
            </button>
          </div>

          {/* Clear Search Button */}
          {data?.data?.products?.length > 0 && (
            <button
              onClick={handleClearSearch}
              className="mt-4 mx-auto block bg-red-500 text-white px-4 py-2 rounded"
            >
              Clear Search
            </button>
          )}

          {/* Loading State */}
          {isLoading ? (
            <IsLoading />
          ) : (
            <>
              {/* Show search image initially (before any search is performed) */}
              {!searchPerformed && (
                <div>
                  <img
                    className="w-1/2 mx-auto object-contain"
                    src={searchIcon}
                    alt="search"
                  />
                </div>
              )}

              {/* Render search results */}
              {!isError && data?.data?.products?.length > 0 ? (
                <ul className="lg:w-3/4 mx-auto mt-8 mb-20  grid lg:grid-cols-2 gap-6">
                  {data?.data?.products?.map(
                    ({ name, image, price, currency, category, id }, index) => (
                      <Link
                        to={`/product-detailed/${id}`}
                        key={index}
                        className="border flex items-center p-2 hover:border-primary transition ease-in duration-300 hover:scale-[0.99]"
                      >
                        <div className="flex-1">
                          <img className="w-full h-full" src={image1} alt="" />
                        </div>
                        <div className="flex-[2] lg:flex-[3]">
                          <p className="text-lg font-bold">{name}</p>
                          <span className="flex items-center gap-x-2">
                            <p>{price}</p>
                            <p>{currency}</p>
                          </span>
                          <p>Category: {category?.[0]?.name}</p>
                        </div>
                      </Link> // Adjust based on your data structure
                    )
                  )}
                </ul>
              ) : (
                // Show failed search image only after the search has been performed and no results are found
                searchPerformed &&
                data?.data?.products?.length === 0 && (
                  <div>
                    <img
                      className="w-1/2 mx-auto object-contain"
                      src={searchFailed}
                      alt="Search failed"
                    />
                  </div>
                )
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination mb-20 flex justify-center items-center gap-x-8">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 ${
                      currentPage === 1 ? "opacity-50" : ""
                    }`}
                  >
                    Previous
                  </button>
                  <span className="">{`Page ${currentPage} of ${totalPages}`}</span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 ${
                      currentPage === totalPages ? "opacity-50" : ""
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    </main>
  );
};

export default Search;
