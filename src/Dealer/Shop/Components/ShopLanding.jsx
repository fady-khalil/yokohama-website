import { useState, useEffect, useContext } from "react";
import Container from "Components/Container/Container";
import { Info, DotsThreeVertical } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Spinner from "Components/RequestHandler/Spinner";
import image from "assests/product-3-removebg-preview.png";

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
  const [quantities, setQuantities] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingItems, setLoadingItems] = useState({});
  const [addToCartLoadingItems, setAddToCartLoadingItems] = useState({});
  // context
  const { dealerToken } = useContext(DealerLoginContext);
  const { AddToCart, displayProductHandler, cart, updateCart, removeFromCart } =
    useContext(DealerCartContext);

  const getData = async (page = 1) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetchData(
        `yokohama/dealer/subcategs?categ_id=${selectedId}&page=${page}`,
        dealerToken
      );
      setData(result);
      if (result?.total_pages) {
        setTotalPages(result.total_pages);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when selectedId changes
    getData();
  }, [selectedId]);

  // cart
  const addToCartHandler = async (id) => {
    setAddToCartLoadingItems((prev) => ({ ...prev, [id]: true }));
    try {
      await AddToCart(id);
      if (quantities[id] > 1) {
        await updateCart(id, quantities[id]);
      }
    } finally {
      setAddToCartLoadingItems((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));

    // Only update cart if the product is already in cart
    if (cart?.cart_items?.some((item) => item.product_id === productId)) {
      setLoadingItems((prev) => ({ ...prev, [productId]: true }));
      try {
        await updateCart(productId, newQuantity);
      } finally {
        setLoadingItems((prev) => ({ ...prev, [productId]: false }));
      }
    }
  };

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

      // Initialize quantities from cart items
      const cartQuantities = {};
      cart.cart_items.forEach((item) => {
        cartQuantities[item.product_id] = item.quantity;
      });
      setQuantities(cartQuantities);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center  mt-32 h-[100vh]">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <IsError />;
  }

  // const data = await postData(
  //   `/yokohama/cart/confirm?&cart_id=${cart?.cart_id}`,
  //   dealerToken
  // );
  return (
    <div className="my-primary">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-44">
          {data?.products?.map(
            (
              {
                id,
                name,
                avg_review,
                price,
                classification,
                currency,
                images,
                brand,
                onSale,
                price_pricelist_rule,
                qty_available,
              },
              dataIndex
            ) => (
              <Link className="group block" key={dataIndex}>
                <div className="flex flex-col-reverse md:flex-row relative">
                  {onSale && (
                    <div className="absolute -top-0 -left-0 z-10">
                      <div
                        className="bg-[#CD4C4F] text-white font-bold py-1 px-8 text-sm uppercase tracking-wider"
                        style={{
                          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                          transform:
                            "rotate(-45deg) translateX(-20%) translateY(-50%)",
                        }}
                      >
                        Sale
                      </div>
                    </div>
                  )}
                  <div className="flex-[1] flex flex-col border-b-4">
                    <p className="text-primary rb-bold text-sm">
                      {classification}
                    </p>
                    <p className="rb-bold">{name}</p>
                    <p className="rb-medium text-sm mt-3">Brand:{brand}</p>
                    <div className="flex items-center gap-x-2 my-3 font-medium">
                      <p>{price_pricelist_rule}$</p>
                      <p>
                        {currency}
                        <span className="text-primary">*</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex-[1] relative">
                    <img
                      className="w-3/4 h-3/4 mx-auto md:w-full md:h-full"
                      src={image}
                      alt=""
                    />
                    {qty_available === 0 && (
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 rb-bold">
                        Sold Out
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-x-2 mt-6 w-3/4 mxs-auto">
                  <div className="flex-1 flex items-center gap-x-2 rb-bold text-white bg-dark relative">
                    <button className="flex items-center flex-1 justify-between px-10 gap-x-2 px-6 py-2">
                      <p
                        onClick={() =>
                          handleQuantityChange(
                            id,
                            Math.max(1, (quantities[id] || 1) - 1)
                          )
                        }
                      >
                        -
                      </p>
                      {loadingItems[id] ? (
                        <Spinner />
                      ) : (
                        <p>{quantities[id] || getCartItemQuantity(id) || 1}</p>
                      )}
                      <p
                        onClick={() =>
                          handleQuantityChange(id, (quantities[id] || 1) + 1)
                        }
                      >
                        +
                      </p>
                    </button>
                  </div>
                  {!cart?.cart_items?.some(
                    (item) => item.product_id === id
                  ) && (
                    <button
                      onClick={() => addToCartHandler(id)}
                      className="flex-1 bg-primary text-white rb-bold w-full text-center py-2 flex items-center justify-center gap-x-2"
                    >
                      {addToCartLoadingItems[id] ? <Spinner /> : "Add To Cart"}
                    </button>
                  )}
                </div>
                {/* <div
                  className={`flex gap-x-2 mt-2 md:w-3/4 transform md:translate-y-[30%] md:opacity-0 md:select-none md:group-hover:select-auto md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-transform duration-500`}
                >
                  <button className="bg-dark text-center uppercase rb-bold py-2 flex-1 text-white w-full">
                    View Details
                  </button>
                  {quantity?.free_quantity === 0 ? (
                    <button className="border bg-gray-500 text-white text-center uppercase rb-bold py-2 flex-1 w-full">
                      Contact Us
                    </button>
                  ) : (
                    <button className="border bg-primary text-white text-center uppercase rb-bold py-2 flex-1 w-full">
                      Shop Now
                    </button>
                  )}
                </div> */}
              </Link>
            )
          )}
        </div>
        {totalPages > 1 && (
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
