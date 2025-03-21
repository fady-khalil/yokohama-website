import { useState, useEffect, useContext } from "react";
import Container from "Components/Container/Container";
import { Info, DotsThreeVertical } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Spinner from "Components/RequestHandler/Spinner";

// fetcing data
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import IsLoading from "Components/RequestHandler/IsLoading";
import IsError from "Components/RequestHandler/IsError";

// context
import { DealerLoginContext } from "context/Auth/DealerContext";
import { DealerCartContext } from "context/DealerCart/DealerCartContext";
const ShopLanding = ({ selectedId }) => {
  const { fetchData, error } = useGetDataToken();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // context
  const { dealerToken } = useContext(DealerLoginContext);
  const {
    AddToCart,
    addToCartLoading,
    displayProductHandler,
    cart,
    updateCart,
    removeFromCart,
  } = useContext(DealerCartContext);

  const getData = async (page = 1) => {
    setIsLoading(true);
    setIsError(false);

    console.log("is called for page:", page);

    try {
      const result = await fetchData(
        `yokohama/dealer/subcategs?categ_id=${selectedId}&page=${page}`,
        dealerToken
      );
      console.log(result);
      setData(result);
      if (result?.total_pages) {
        setTotalPages(result.total_pages);
      }
      // setFilteredData(result?.data || []);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      updateCart(productId, quantity);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when selectedId changes
    getData(1);
  }, [selectedId]);

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const [foundProducts, setFoundProducts] = useState();

  useEffect(() => {
    if (cart?.cart_items) {
      const foundItems = data?.data?.flatMap((item) =>
        item.products?.filter((product) =>
          cart?.cart_items?.some(
            (cartItem) => cartItem.product_id === product.id
          )
        )
      );

      // Do something with the foundItems, such as setting state
      if (foundItems?.length > 0) {
        setIsInCart(true);
        setFoundProducts(foundItems); // Store the found products
      } else {
        setIsInCart(false);
        setFoundProducts([]); // No matching products found
      }
    }
  }, [cart, data]);

  const getCartItemQuantity = (productId) => {
    const cartItem = cart?.cart_items?.find(
      (item) => item.product_id === productId
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="mb-primary">
      <Container>
        <div className="flex items-center justify-end gap-x-6 my-8">
          <span className="flex items-center gap-x-3 ">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>

            <p>available</p>
          </span>
          <span className="flex items-center gap-x-3">
            <span className="w-3 h-3 bg-primary rounded-full"></span>
            <p>Not available</p>
          </span>
        </div>
        <div className="overflow-scroll xl:overflow-hidden">
          {isLoading ? (
            <div className="flex w-max justify-center mx-auto  flex-col items-center">
              <Spinner />
              <p className="mt-3">Loading data...</p>
            </div>
          ) : (
            <table className="w-full ">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                    <span className="flex items-center justify-center ">
                      <DotsThreeVertical size={32} />
                      <p>Tire Size</p>
                    </span>
                  </th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                    <span className="flex items-center justify-center ">
                      <DotsThreeVertical size={32} />
                      <p>Brand</p>
                    </span>
                  </th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                    <span className="flex items-center justify-center ">
                      <DotsThreeVertical size={32} />
                      <p>Pattern</p>
                    </span>
                  </th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                    <span className="flex items-center justify-center ">
                      <DotsThreeVertical size={32} />
                      <p>Price</p>
                    </span>
                  </th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                    <span className="flex items-center justify-center ">
                      <DotsThreeVertical size={32} />
                      <p>Discount</p>
                    </span>
                  </th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                    <span className="flex items-center justify-center ">
                      <DotsThreeVertical size={32} />
                      <p>available QTY</p>
                    </span>
                  </th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                    <span className="flex items-center justify-center ">
                      <DotsThreeVertical size={32} />
                      <p>QTY</p>
                    </span>
                  </th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                    Subtotal
                  </th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm"></th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm"></th>
                </tr>
              </thead>

              <tbody className="">
                {data?.products?.map(
                  (
                    {
                      id,
                      name,
                      price,
                      brand,
                      pattern,
                      discount,
                      qty_available,
                    },
                    index
                  ) => {
                    const isProductInCart = foundProducts?.some(
                      (product) => product.id === id
                    );
                    const cartQuantity = getCartItemQuantity(id);

                    return (
                      <tr key={id}>
                        <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b rb-bold text-sm">
                          <Link to={`/product-detailed/${id}`}>{name}</Link>
                        </td>
                        <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b rb-bold text-sm">
                          <Link to={`/product-detailed/${id}`}>{brand}</Link>
                        </td>
                        <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b rb-bold text-sm">
                          <Link to={`/product-detailed/${id}`}>{pattern}</Link>
                        </td>
                        <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b rb-bold text-sm">
                          <Link to={`/product-detailed/${id}`}>
                            {price} USD
                          </Link>
                        </td>
                        <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b rb-bold text-sm">
                          <p>{discount}</p>
                        </td>
                        <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b rb-bold text-sm">
                          <div className="flex items-center gap-x-2 justify-center">
                            <span
                              className={`w-3 h-3 ${
                                qty_available > 0
                                  ? "bg-green-500"
                                  : "bg-primary"
                              } rounded-full block`}
                            ></span>
                            {qty_available}
                          </div>
                        </td>
                        <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b rb-bold text-sm">
                          <span className="w-[80%] mx-auto flex items-center gap-x-4 justify-between px-2 py-1 border">
                            <button
                              disabled={!isProductInCart}
                              onClick={() =>
                                handleQuantityChange(id, cartQuantity + 1)
                              }
                            >
                              +
                            </button>
                            <p>{cartQuantity}</p>
                            <button
                              disabled={!isProductInCart}
                              onClick={() =>
                                handleQuantityChange(id, cartQuantity - 1)
                              }
                            >
                              -
                            </button>
                          </span>
                        </td>
                        <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b rb-bold text-sm">
                          <p>Sub Total</p>
                        </td>
                        <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b rb-bold text-sm">
                          <button
                            onClick={() => AddToCart(id)}
                            className={`px-4 py-1.5 rb-bold text-sm text-white uppercase ${
                              isProductInCart ? "bg-primary" : "bg-black"
                            }`}
                          >
                            {addToCartLoading[id] ? (
                              <Spinner isSmall={true} />
                            ) : isProductInCart ? (
                              "In your cart"
                            ) : (
                              "Add to cart"
                            )}
                          </button>
                        </td>
                        <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b rb-bold text-sm">
                          <button className="text-white bg-primary p-1 rounded-full">
                            <Info weight="fill" />
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          )}
        </div>

        {totalPages > 1 && !isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
    </div>
  );
};

// Pagination component similar to the one in src/Pages/Shop/Components/Listing.jsx
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const createPageArray = () => {
    let pages = [];
    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [
          1,
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
      }
      pages = [...new Set(pages)];
      if (pages[1] > 2) pages.splice(1, 0, "...");
      if (pages[pages.length - 2] < totalPages - 1)
        pages.splice(pages.length - 1, 0, "...");
    }
    return pages;
  };

  const pages = createPageArray();

  return (
    <div className="flex justify-center mt-8 mb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-2 px-2 sm:px-4 py-1 sm:py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        &lt;
      </button>
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`mx-1 sm:mx-2 px-2 sm:px-4 py-1 sm:py-2 rounded ${
            typeof page === "number" && page === currentPage
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-2 px-2 sm:px-4 py-1 sm:py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default ShopLanding;
