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
import { WhatsappLogo } from "@phosphor-icons/react";

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
  const [quantities, setQuantities] = useState({});

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
    setSearchPerformed(false); // Reset search performed flag when typing
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

  const handleQuantityChange = (id, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
  };

  return (
    <main>
      <section className=" my-14">
        <Container>
          <div className="border border-black rounded-lg flex items-stretch gap-x-2  lg:w-1/2 mx-auto ">
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
            <div className="flex items-center justify-center  gap-x-10 my-4">
              <p className="text-2xl rb-bold  text-center">Search Result</p>
              <button
                onClick={handleClearSearch}
                className=" mx-autso block bg-red-500   text-white px-4 py-2 rounded"
              >
                Clear Search
              </button>
            </div>
          )}
          <>
            {!isError && data?.data?.products?.length > 0 ? (
              <div className="overflow-x-auto">
                {/* Table Header - Desktop Only */}
                <div className="hidden lg:flex w-full bg-gray-100 p-4 rounded-t-lg">
                  <div className="flex-[2] font-semibold">Tire Size</div>
                  <div className="flex-1 font-semibold">Pattern</div>
                  <div className="flex-1 font-semibold">Original Price</div>
                  <div className="flex-1 font-semibold">Price List</div>
                  <div className="flex-1 font-semibold">Availability</div>
                  <div className="w-32"></div>
                  <div className="w-32"></div>
                </div>

                {/* Table Body */}
                {data?.data?.products?.map((product) => (
                  <div key={product.id} className="border-b">
                    {/* Desktop View */}
                    <div className="hidden lg:flex w-full p-4 items-center">
                      <div className="flex-[2]">{product.name}</div>
                      <div className="flex-1">{product.pattern}</div>
                      <div className="flex-1">
                        ${product.original_price?.toFixed(2)}
                      </div>
                      <div className="flex-1">${product.price?.toFixed(2)}</div>
                      <div
                        className={`flex-1 ${
                          product.quantity?.free_quantity > 0
                            ? "text-green-500"
                            : product.quantity?.free_quantity === 0 &&
                              product.quantity?.incoming_quantity > 0
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {product.quantity?.free_quantity > 0
                          ? "In Stock"
                          : product.quantity?.free_quantity === 0 &&
                            product.quantity?.incoming_quantity > 0
                          ? "Coming Soon"
                          : "Out of Stock"}
                      </div>
                      <div className="flex-1 relative">
                        <div className="flex justify-center items-center space-x-4">
                          {product.quantity?.free_quantity > 0 ? (
                            <>
                              <button
                                className="px-2 py-1 bg-gray-200 rounded"
                                onClick={() =>
                                  handleQuantityChange(
                                    product.id,
                                    (quantities[product.id] || 1) - 1
                                  )
                                }
                              >
                                -
                              </button>
                              <span>{quantities[product.id] || 1}</span>
                              <button
                                className="px-2 py-1 bg-gray-200 rounded"
                                onClick={() =>
                                  handleQuantityChange(
                                    product.id,
                                    (quantities[product.id] || 1) + 1
                                  )
                                }
                              >
                                +
                              </button>
                            </>
                          ) : product.quantity?.free_quantity === 0 &&
                            product.quantity?.incoming_quantity > 0 ? (
                            <span className="flex text-xs">
                              Contact us for availability date
                            </span>
                          ) : (
                            <span className="text-xs flex">
                              Contact us to check alternatives
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-32">
                        <div className="flex justify-center">
                          {product.quantity?.free_quantity > 0 ? (
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 border-red-500 border text-red-500 accent-red-500"
                              />
                            </label>
                          ) : (
                            <button className="text-xs text-gray-500">
                              <WhatsappLogo size={24} color="#25D366" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Mobile View */}
                    <div className="lg:hidden p-4 space-y-4">
                      <div className="flex flex-col space-y-3">
                        {/* Tire Size */}
                        <div className="font-semibold text-lg">
                          {product.name}
                        </div>

                        {/* Pattern */}
                        <div className="">{product.pattern}</div>

                        {/* Prices */}
                        <div className="flex justify-x items-x space-x-4">
                          <span className="font-semibold text-primary">
                            ${product.price?.toFixed(2)}
                          </span>
                        </div>

                        {/* Availability with contact message */}
                        <div className="flex items-center justify-between">
                          <div
                            className={`${
                              product.quantity?.free_quantity > 0
                                ? "text-green-500"
                                : product.quantity?.free_quantity === 0 &&
                                  product.quantity?.incoming_quantity > 0
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {product.quantity?.free_quantity > 0
                              ? "In Stock"
                              : product.quantity?.free_quantity === 0 &&
                                product.quantity?.incoming_quantity > 0
                              ? "Coming Soon"
                              : "Out of Stock"}
                          </div>
                          {product.quantity?.free_quantity === 0 &&
                          product.quantity?.incoming_quantity > 0 ? (
                            <div className="text-xs text-center mt-1">
                              Contact us for availability date
                            </div>
                          ) : product.quantity?.free_quantity === 0 ? (
                            <div className="text-xs text-center mt-1">
                              Contact us to check alternatives
                            </div>
                          ) : null}
                        </div>

                        {/* Quantity and Add to Cart */}
                        {product.quantity?.free_quantity > 0 && (
                          <div className="flex items-center space-x-4 pt-2">
                            <div className="flex items-center space-x-3">
                              <button
                                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center"
                                onClick={() =>
                                  handleQuantityChange(
                                    product.id,
                                    (quantities[product.id] || 1) - 1
                                  )
                                }
                              >
                                -
                              </button>
                              <span>{quantities[product.id] || 1}</span>
                              <button
                                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center"
                                onClick={() =>
                                  handleQuantityChange(
                                    product.id,
                                    (quantities[product.id] || 1) + 1
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 border-red-500 border text-red-500 accent-red-500"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Only show "No results found" when search is performed and there are no results
              searchPerformed &&
              searchInput && // Add this condition to ensure message is hidden when search is cleared
              data?.data?.products?.length === 0 && (
                <div className="flex items-center justify-center mt-6">
                  <p>No results found</p>
                </div>
              )
            )}

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
        </Container>
      </section>
    </main>
  );
};

export default Search;
