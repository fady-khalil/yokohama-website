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
  const [classifications, setClassifications] = useState([]);
  const [selectedClassification, setSelectedClassification] = useState(null);
  const { fetchData, error } = useGetData();

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetchData(`brand/${id}/products/yokohama`);
      setData(result);

      // Extract unique classifications and filter out false/null values
      if (result?.products && result.products.length > 0) {
        const uniqueClassifications = [
          ...new Set(
            result.products
              .map((product) => product.classification)
              .filter((classification) => classification) // This filters out false, null, undefined, etc.
          ),
        ];
        setClassifications(uniqueClassifications);
        setSelectedClassification(uniqueClassifications[0]); // Select the first classification by default
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  // Filter products based on selected classification
  const filteredProducts =
    data?.products?.filter(
      (product) =>
        !selectedClassification ||
        product.classification === selectedClassification
    ) || [];

  if (isError || error) return <IsError />;
  if (isLoading) return <IsLoading />;
  return (
    <main className="bg-dark">
      <Header header={"Products"} />
      <Container>
        {/* Classification Tabs - Dropdown for small screens, Buttons for md and up */}
        <div className="pt-14 md:py-14 flex justify-center items-center">
          {/* Dropdown for small screens (hidden on md and up) */}
          <div className="relative w-full max-w-xs md:hidden">
            <select
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg appearance-none cursor-pointer"
              value={selectedClassification || ""}
              onChange={(e) =>
                setSelectedClassification(e.target.value || null)
              }
            >
              <option value="">All Classifications</option>
              {classifications.map((classification) => (
                <option key={classification} value={classification}>
                  {classification}
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
                !selectedClassification
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setSelectedClassification(null)}
            >
              All
            </button>
            {classifications.map((classification) => (
              <button
                key={classification}
                className={`px-4 py-2 rounded-lg ${
                  selectedClassification === classification
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setSelectedClassification(classification)}
              >
                {classification}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-8 py-secondary">
          {filteredProducts.slice(0, 10).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {product.image_url ? (
                  <img
                    src={
                      product.image_url.startsWith("/")
                        ? `https://yokohama.onet.jo${product.image_url}`
                        : product.image_url
                    }
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-gray-400">No image</div>
                )}
              </div>
              <div className="p-4 flex flex-col ">
                <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded mb-2 inline-block">
                  {product.classification}
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
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-10">
              No products found for the selected classification.
            </div>
          )}
        </div>
      </Container>
    </main>
  );
};

export default Products;
