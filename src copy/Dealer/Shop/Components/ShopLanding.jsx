import { useState, useEffect, useContext } from "react";
import Container from "Components/Container/Container";
import { WhatsappLogo } from "@phosphor-icons/react";
import Spinner from "Components/RequestHandler/Spinner";

// fetcing data
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import IsError from "Components/RequestHandler/IsError";
import Search from "./Search";
import Filter from "./Filter";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
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

  // Filter states
  const [selectedBrandID, setSelectedBrandID] = useState(null);
  const [selectClassificationID, setSelectClassificationID] = useState(null);
  const [selectCategoryId, setSelectCategoryId] = useState(null);
  const [selectedWidth, setSelectedWidth] = useState(null);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(null);
  const [selectedDiameter, setSelectedDiameter] = useState(null);
  const [selectedSizeName, setSelectedSizeName] = useState(null);
  const [sortOrder, setSortOrder] = useState("");

  // context
  const { dealerToken } = useContext(DealerLoginContext);
  const { AddToCart, cart, updateCart, removeFromCart, updateCartLoading } =
    useContext(DealerCartContext);

  const getData = async (page = 1) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetchData(
        `yokohama/categories/subcategs/all?category_id=${selectedId}${
          selectClassificationID
            ? `&classification_id=${selectClassificationID}`
            : ""
        }${selectedBrandID ? `&brand_id=${selectedBrandID}` : ""}${
          selectCategoryId ? `&kind_id=${selectCategoryId}` : ""
        }${selectedWidth ? `&width=${selectedWidth}` : ""}${
          selectedAspectRatio ? `&aspect=${selectedAspectRatio}` : ""
        }${selectedDiameter ? `&inch=${selectedDiameter}` : ""}${
          selectedSizeName ? `&size=${selectedSizeName}` : ""
        }&page=${page}`,
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
  }, [
    currentPage,
    selectedId,
    selectClassificationID,
    selectedBrandID,
    selectCategoryId,
    selectedWidth,
    selectedAspectRatio,
    selectedDiameter,
    selectedSizeName,
  ]);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when selectedId changes
    clearFilters(); // Clear filters when category changes
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

  // Filter handlers
  const handleFilterChange = (filterType, value) => {
    setCurrentPage(1); // Reset to page 1 when filter changes

    switch (filterType) {
      case "brand":
        setSelectedBrandID(value);
        break;
      case "category":
        setSelectCategoryId(value);
        break;
      case "classification":
        setSelectClassificationID(value);
        break;
      case "sizeName":
        setSelectedSizeName(value);
        setSelectedWidth(null);
        setSelectedAspectRatio(null);
        setSelectedDiameter(null);
        break;
      case "width":
        setSelectedWidth(value);
        setSelectedSizeName(null);
        break;
      case "aspectRatio":
        setSelectedAspectRatio(value);
        setSelectedSizeName(null);
        break;
      case "diameter":
        setSelectedDiameter(value);
        setSelectedSizeName(null);
        break;
      case "sort":
        setSortOrder(value);
        break;
      default:
        break;
    }
  };

  const clearFilters = () => {
    setSelectedBrandID(null);
    setSelectClassificationID(null);
    setSelectCategoryId(null);
    setSelectedWidth(null);
    setSelectedAspectRatio(null);
    setSelectedDiameter(null);
    setSelectedSizeName(null);
    setSortOrder("");
  };

  // Apply sorting if needed
  let displayData = data;
  if (sortOrder && data?.data) {
    const sortedData = { ...data };
    sortedData.data = [...data.data].sort((a, b) => {
      if (sortOrder === "high-to-low") {
        return b.dealer_price?.price - a.dealer_price?.price;
      } else if (sortOrder === "low-to-high") {
        return a.dealer_price?.price - b.dealer_price?.price;
      }
      return 0;
    });
    displayData = sortedData;
  }

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
        <Filter
          data={data}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
          selectedFilters={{
            brand: selectedBrandID,
            category: selectCategoryId,
            classification: selectClassificationID,
            width: selectedWidth,
            aspectRatio: selectedAspectRatio,
            diameter: selectedDiameter,
            sizeName: selectedSizeName,
            sort: sortOrder,
          }}
        />

        <ProductList
          data={displayData}
          cart={cart}
          quantities={quantities}
          loadingItems={loadingItems}
          updateCartLoading={updateCartLoading}
          addToCartLoadingItems={addToCartLoadingItems}
          showStockPopup={showStockPopup}
          selectedProduct={selectedProduct}
          handleQuantityChange={handleQuantityChange}
          removeFromCart={removeFromCart}
          addToCartHandler={addToCartHandler}
        />

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

export default ShopLanding;
