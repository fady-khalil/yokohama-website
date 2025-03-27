import { useState, useEffect, useContext } from "react";
import Container from "Components/Container/Container";
import { WhatsappLogo } from "@phosphor-icons/react";
import Spinner from "Components/RequestHandler/Spinner";

// fetcing data
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import IsError from "Components/RequestHandler/IsError";
import Search from "./Search";
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
  const [showPopup, setShowPopup] = useState(false);
  const [popupProduct, setPopupProduct] = useState(null);
  const [showStockPopup, setShowStockPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedWidth, setSelectedWidth] = useState(null);
  const [selectedAspectRation, setSelectedAspectRation] = useState(null);
  const [selectedDiameter, setSelectedDiameter] = useState(null);
  const [selectedSizeName, setSelectedSizeName] = useState(null);
  // context
  const { dealerToken } = useContext(DealerLoginContext);
  const { AddToCart, cart, updateCart, removeFromCart, updateCartLoading } =
    useContext(DealerCartContext);

  const getData = async (page = 1) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetchData(
        `yokohama/categories/subcategs/all?category_id=${selectedId}`
      );
      // const result = await fetchData(
      //   `yokohama/dealer/subcategs?categ_id=${selectedId}&page=${page}`,
      //   dealerToken
      // );
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

      // Get product data for the popup
      const product = data?.products?.find((product) => product.id === id);
      if (product) {
        setPopupProduct(product);
        setShowPopup(true);

        // Hide popup after 3 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      }
    } finally {
      setAddToCartLoadingItems((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    // Find the product
    const product = data?.data?.find((p) => p.id === productId);

    // Check if new quantity exceeds available stock
    if (product && newQuantity > product.quantity?.free_quantity) {
      setSelectedProduct(product);
      setShowStockPopup(true);

      // Hide popup after 3 seconds
      setTimeout(() => {
        setShowStockPopup(false);
      }, 2000);

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
      <div className="flex items-center justify-center mt-32 ">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <IsError />;
  }

  return (
    <div className="mb-primary">
      <Container>
        <Search />
        {/* Filter UI with dropdowns */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {/* Brands Filter */}
            <div className="border rounded-lg p-3">
              <h3 className="font-semibold mb-2">Brands</h3>
              <select
                className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Brand
                </option>
                {data?.brands?.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Categories Filter */}
            <div className="border rounded-lg p-3">
              <h3 className="font-semibold mb-2">Categories</h3>
              <select
                className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Category
                </option>
                {data?.categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Conditional Size Filters */}
            {data?.width?.length === 1 && data.width[0] === 0.0 ? (
              // By Size Name Filter
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold mb-2">By Size</h3>
                <select
                  className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={selectedSizeName || ""}
                  onChange={(e) => {
                    setSelectedSizeName(e.target.value);
                    // Add your onHandleSizeName logic here
                  }}
                >
                  <option value="">Select Size</option>
                  {data?.size_name?.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              // Tire Size Filters
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold mb-2">Tire Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {/* Width */}
                  <select
                    className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={selectedWidth || ""}
                    onChange={(e) => {
                      const newWidth = e.target.value
                        ? parseFloat(e.target.value)
                        : null;
                      setSelectedWidth(newWidth);
                      setSelectedAspectRation(null);
                      setSelectedDiameter(null);
                      // Add your onHandleWidth logic here
                    }}
                  >
                    <option value="">Width</option>
                    {data?.width?.map((width, index) => (
                      <option key={index} value={width}>
                        {width}
                      </option>
                    ))}
                  </select>

                  {/* Aspect Ratio */}
                  <select
                    className={`w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      !selectedWidth ? "opacity-50" : ""
                    }`}
                    value={selectedAspectRation || ""}
                    onChange={(e) => {
                      const newAspect = e.target.value
                        ? parseFloat(e.target.value)
                        : null;
                      setSelectedAspectRation(newAspect);
                      setSelectedDiameter(null);
                      // Add your onHandleAspectRatio logic here
                    }}
                    disabled={!selectedWidth}
                  >
                    <option value="">Aspect</option>
                    {selectedWidth &&
                      data?.aspect?.map((aspect, index) => (
                        <option key={index} value={aspect}>
                          {aspect}
                        </option>
                      ))}
                  </select>

                  {/* Diameter */}
                  <select
                    className={`w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      !selectedWidth || !selectedAspectRation
                        ? "opacity-50"
                        : ""
                    }`}
                    value={selectedDiameter || ""}
                    onChange={(e) => {
                      const newDiameter = e.target.value
                        ? parseFloat(e.target.value)
                        : null;
                      setSelectedDiameter(newDiameter);
                      // Add your onHandleDiameter logic here
                    }}
                    disabled={!selectedWidth || !selectedAspectRation}
                  >
                    <option value="">Diameter</option>
                    {selectedWidth &&
                      selectedAspectRation &&
                      data?.inch?.map((inch, index) => (
                        <option key={index} value={inch}>
                          {inch}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            )}

            {/* Classifications Filter */}
            <div className="border rounded-lg p-3">
              <h3 className="font-semibold mb-2">Classifications</h3>
              <select
                className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Classification
                </option>
                {data?.classification?.map((classification) => (
                  <option key={classification.id} value={classification.id}>
                    {classification.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          {/* Table Header */}
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
          {data?.data?.map((product) => (
            <div key={product.id} className="border-b">
              {/* Desktop View (lg screens) */}
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
                  {/* Add the stock popup */}
                  {showStockPopup &&
                    selectedProduct &&
                    selectedProduct.id === product.id && (
                      <div className="absolute -bottom-[200%] left-0 bg-white border border-primary w-full h-auto shadow-lg rounded-lg p-4 z-[100]">
                        <div className="border-b border-primary pb-2">
                          <p className="text-amber-600 font-medium">
                            Limited Stock Notice
                          </p>
                        </div>
                        <div className="my-4">
                          <p>
                            Sorry, we have only{" "}
                            {selectedProduct?.quantity?.free_quantity} unit
                            {selectedProduct?.quantity?.free_quantity !== 1
                              ? "s"
                              : ""}{" "}
                            available in stock.
                          </p>
                        </div>
                      </div>
                    )}
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
                          disabled={loadingItems[product.id]}
                        >
                          -
                        </button>
                        <span>
                          {updateCartLoading[product.id] ? (
                            <Spinner isSmall={true} />
                          ) : (
                            quantities[product.id] || 1
                          )}
                        </span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() =>
                            handleQuantityChange(
                              product.id,
                              (quantities[product.id] || 1) + 1
                            )
                          }
                          disabled={loadingItems[product.id]}
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
                          className={`form-checkbox h-5 w-5 border-red-500 border text-red-500 accent-red-500 ${
                            cart?.cart_items?.some(
                              (item) => item.product_id === product.id
                            )
                              ? "checked:bg-red-500 checked:border-red-500"
                              : ""
                          }`}
                          checked={cart?.cart_items?.some(
                            (item) => item.product_id === product.id
                          )}
                          onChange={() => {
                            if (
                              cart?.cart_items?.some(
                                (item) => item.product_id === product.id
                              )
                            ) {
                              removeFromCart(product.id);
                            } else {
                              addToCartHandler(product.id);
                            }
                          }}
                          disabled={addToCartLoadingItems[product.id]}
                        />
                        {addToCartLoadingItems[product.id] && (
                          <span className="ml-2">
                            <Spinner small />
                          </span>
                        )}
                      </label>
                    ) : (
                      <button className="text-xs text-gray-500">
                        <WhatsappLogo size={24} color="#25D366" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile and Tablet View */}
              <div className="lg:hidden p-4 space-y-4">
                <div className="flex flex-col space-y-3">
                  {/* Tire Size */}

                  <div>
                    <div className="font-semibold  text-lg">{product.name}</div>

                    {/* Pattern */}
                    <div className="">{product.pattern}</div>
                  </div>

                  {/* Prices */}
                  <div className="flex justify-x items-x space-x-4">
                    {/* <span className="line-through text-gray-500">
                      ${product.original_price?.toFixed(2)}
                    </span> */}
                    <span className="font-semibold text-primary">
                      ${product.price?.toFixed(2)}
                    </span>
                  </div>

                  {/* Availability with contact message */}
                  <div className="flex  items-center justify-between">
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
                    <div className="flex  items-center space-x-4 pt-2 ">
                      <div className="flex items-center space-x-3">
                        <button
                          className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center"
                          onClick={() =>
                            handleQuantityChange(
                              product.id,
                              (quantities[product.id] || 1) - 1
                            )
                          }
                          disabled={loadingItems[product.id]}
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
                          disabled={loadingItems[product.id]}
                        >
                          +
                        </button>
                      </div>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className={`form-checkbox h-5 w-5 border-red-500 border text-red-500 accent-red-500 ${
                            cart?.cart_items?.some(
                              (item) => item.product_id === product.id
                            )
                              ? "checked:bg-red-500 checked:border-red-500"
                              : ""
                          }`}
                          checked={cart?.cart_items?.some(
                            (item) => item.product_id === product.id
                          )}
                          onChange={() => {
                            if (
                              cart?.cart_items?.some(
                                (item) => item.product_id === product.id
                              )
                            ) {
                              removeFromCart(product.id);
                            } else {
                              addToCartHandler(product.id);
                            }
                          }}
                          disabled={addToCartLoadingItems[product.id]}
                        />
                        {addToCartLoadingItems[product.id] && (
                          <span className="ml-2">
                            <Spinner small />
                          </span>
                        )}
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show popup when item is added to cart */}

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
