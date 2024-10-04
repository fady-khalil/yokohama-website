import Container from "Components/Container/Container";
import { useContext, useState, useEffect, useCallback } from "react";
import Input from "form/Inputs/Input";
import { UserLoginContext } from "context/Auth/UserLoginContext";
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import BASE_URL from "Utilities/BASE_URL";
import { MagnifyingGlass } from "@phosphor-icons/react";

const Search = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [prevSearchInput, setPrevSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { userToken, userIsSignIn } = useContext(UserLoginContext);

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

    try {
      const response = await fetch(
        `${BASE_URL}/Yokohama/search?search_query=${searchInput}&page=${currentPage}`
      );

      console.log(response);
      if (!response.ok) {
        setIsError(true);
        // throw new Error("Something went wrong!");
      }

      const data = await response.json();
      //   console.log(data);
      //   setData(data);
      //   setTotalPages(data.total_pages);
      //   setPrevSearchInput(searchInput);
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

  // Pagination controls
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <main>
      <section className="h-[100vh]">
        <Container>
          <div className="border border-black rounded-lg flex items-stretch gap-x-2 mt-32 w-1/2 mx-auto">
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
              <MagnifyingGlass />
            </button>
          </div>

          {isLoading && <p>Loading...</p>}
          {isError && <p>Something went wrong. Please try again.</p>}

          {!isLoading && !isError && data.length > 0 && (
            <div>
              {/* Render search results */}
              <ul>
                {data.map((item, index) => (
                  <li key={index}>{item.name}</li> // Adjust based on your data structure
                ))}
              </ul>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination mt-4 flex justify-center gap-x-4">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 ${
                      currentPage === 1 ? "opacity-50" : ""
                    }`}
                  >
                    Previous
                  </button>
                  <span>{`Page ${currentPage} of ${totalPages}`}</span>
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
            </div>
          )}
        </Container>
      </section>
    </main>
  );
};

export default Search;
