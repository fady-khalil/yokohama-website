import { useState, useEffect } from "react";

import Container from "Components/Container/Container";

import Header from "Pages/Shop/Components/Header";

import { useParams } from "react-router-dom";
import useGetData from "Hooks/Fetching/useGetData";
import IsLoading from "Components/RequestHandler/IsLoading";
import IsError from "Components/RequestHandler/IsError";

const Products = () => {
  // fetching
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [kinds, setKinds] = useState([]);
  const [selectedKindId, setSelectedKindId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchData, error } = useGetData();

  const getData = async (kindId = null, page = 1) => {
    setIsLoading(true);
    setIsError(false);

    try {
      // Build endpoint with parameters for kind_id and page
      let endpoint = `brand/${id}/products/yokohama`;
      const params = [];

      if (kindId) {
        params.push(`kind_id=${kindId}`);
      }

      if (page > 1) {
        params.push(`page=${page}`);
      }

      if (params.length > 0) {
        endpoint += `?${params.join("&")}`;
      }

      const result = await fetchData(endpoint);
      setData(result);

      // Set kinds from the kinds_list array if available
      if (result?.kind_brands_list && result.kind_brands_list.length > 0) {
        setKinds(result.kind_brands_list);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(selectedKindId, currentPage);
  }, [id, selectedKindId, currentPage]);

  // Handle kind selection
  const handleKindSelection = (kindId) => {
    setSelectedKindId(kindId);
    setCurrentPage(1); // Reset to first page when changing kind
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0); // Scroll to top when changing page
  };

  // Generate pagination buttons
  const renderPagination = () => {
    if (!data?.total_product_pages || data.total_product_pages <= 1)
      return null;

    const totalPages = data.total_product_pages;
    const pageButtons = [];

    // Previous button
    pageButtons.push(
      <button
        key="prev"
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-2 px-2 sm:px-4 py-1 sm:py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50 text-xl"
      >
        &lt;
      </button>
    );

    // Calculate range of pages to show
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    // Adjust if we're at the end
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    // First page and ellipsis if needed
    if (startPage > 1) {
      pageButtons.push(
        <button
          key="1"
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          1
        </button>
      );

      if (startPage > 2) {
        pageButtons.push(
          <span key="ellipsis1" className="px-3 py-2">
            ...
          </span>
        );
      }
    }

    // Page buttons
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 sm:mx-1 px-1 sm:px-4 py-1 sm:py-2 rounded ${
            currentPage === i
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(
          <span key="ellipsis2" className="px-3 py-2">
            ...
          </span>
        );
      }

      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pageButtons.push(
      <button
        key="next"
        onClick={() =>
          currentPage < totalPages && handlePageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className="text-xl mx-2 px-2 sm:px-4 py-1 sm:py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        &gt;
      </button>
    );

    return (
      <div className="flex justify-center items-center gap-2 py-secondary">
        {pageButtons}
      </div>
    );
  };

  if (isError || error) return <IsError />;
  if (isLoading) return <IsLoading />;
  return (
    <main className="bg-dark">
      <Header header={"Products"} />
      <Container>
        {/* Kind Tabs - Dropdown for small screens, Buttons for md and up */}
        <div className="pt-14 md:py-14 flex justify-center items-center">
          {/* Dropdown for small screens (hidden on md and up) */}
          <div className="relative w-full max-w-xs md:hidden">
            <select
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg appearance-none cursor-pointer"
              value={selectedKindId || ""}
              onChange={(e) =>
                handleKindSelection(
                  e.target.value ? Number(e.target.value) : null
                )
              }
            >
              <option value="">All Types</option>
              {kinds.map((kind) => (
                <option key={kind.id} value={kind.id}>
                  {kind.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {/* Buttons for md screens and up (hidden on small screens) */}
          <div className="hidden md:flex flex-wrap gap-2 justify-center items-center">
            <button
              className={`px-4 py-2 rounded-lg ${
                !selectedKindId
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleKindSelection(null)}
            >
              All
            </button>
            {kinds.map((kind) => (
              <button
                key={kind.id}
                className={`px-4 py-2 rounded-lg ${
                  selectedKindId === kind.id
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => handleKindSelection(kind.id)}
              >
                {kind.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-8 py-secondary">
          {data?.products?.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-gray-400">No image</div>
                )}
              </div>
              <div className="p-4 flex flex-col ">
                <span className="text-xs font-semibold bg-primary text-white px-3 py-1 rounded mb-2 inline-block w-max">
                  {product.kind?.name}
                </span>
                <h3 className="text-lg font-semibold mb-6 ">{product.name}</h3>
                <div className="flex justify-between items-center mt-auto h-full flex-1">
                  <span className="text-primary font-bold">
                    ${product.price.toFixed(2)} {product.currency}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.series}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {!data?.products ||
            (data.products.length === 0 && (
              <div className="col-span-full text-center text-gray-400 py-10">
                No products found for the selected type.
              </div>
            ))}
        </div>

        {/* Pagination */}
        {renderPagination()}
      </Container>
    </main>
  );
};

export default Products;
