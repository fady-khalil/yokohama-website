import { WhatsappLogo } from "@phosphor-icons/react";
import Spinner from "Components/RequestHandler/Spinner";
import { useState, useContext } from "react";
import { DealerLoginContext } from "context/Auth/DealerContext";
const ProductList = ({
  data,
  cart,
  quantities,
  loadingItems,
  updateCartLoading,
  addToCartLoadingItems,
  showStockPopup,
  selectedProduct,
  handleQuantityChange,
  removeFromCart,
  addToCartHandler,
}) => {
  const { dealerData } = useContext(DealerLoginContext);
  const [isLoadingWhatsapp, setIsLoadingWhatsapp] = useState(false);
  const [whatsappProduct, setWhatsappProduct] = useState(null);

  const handleWhatsappClick = async (product, stockStatus) => {
    setIsLoadingWhatsapp(true);
    setWhatsappProduct(product);

    console.log(stockStatus);

    let message = "I'm interested in this product:";

    if (stockStatus === "outOfStock") {
      message = `Hello, My Name is ${dealerData?.username} (Dealer). I'd like to check for alternatives for this product: ${product?.name}`;
    } else if (stockStatus === "comingSoon") {
      message = `Hello, My Name is ${dealerData?.username} (Dealer). I'd like to know when this product will be available: ${product?.name}`;
    } else {
      message = `Hello, My Name is ${dealerData?.username}. I'm interested in this product: ${product?.name}`;
    }

    try {
      // Instead of making a direct API call with fetch,
      // create the WhatsApp URL manually to avoid CORS issues
      const phoneNumber = "96103010958"; // Remove the + for WhatsApp URLs
      const productName = encodeURIComponent(product?.name || "");
      const encodedMessage = encodeURIComponent(`${message} `);

      // Create the WhatsApp URL directly
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      // Open the WhatsApp link in a new tab
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Error handling WhatsApp click:", error);
    } finally {
      setIsLoadingWhatsapp(false);
    }
  };
  return (
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
            <div className="flex-1">
              {product.quantity?.free_quantity} /{" "}
              {product.quantity?.incoming_quantity}
            </div>
            {/* <div className="flex-1">{product.pattern}</div> */}
            <div className="flex-1">
              ${product.dealer_price.price?.toFixed(2)}
            </div>
            <div className="flex-1">
              ${product.dealer_price?.retail_price.toFixed(2)}
            </div>
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
                  <button
                    onClick={() =>
                      handleWhatsappClick(
                        product,
                        product.quantity?.free_quantity === 0 &&
                          product.quantity?.incoming_quantity > 0
                          ? "comingSoon"
                          : "outOfStock"
                      )
                    }
                    className="text-xs flex"
                  >
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
                <div className="font-semibold text-lg">{product.name}</div>
                {/* Pattern */}
                <div className="">{product.pattern}</div>
              </div>

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
                    <button
                      onClick={() => handleWhatsappClick(product, "comingSoon")}
                      className="flex items-center"
                    >
                      <WhatsappLogo size={24} color="#25D366" />
                      <span className="ml-1">Contact for availability</span>
                    </button>
                  </div>
                ) : product.quantity?.free_quantity === 0 ? (
                  <div className="text-xs text-center mt-1">
                    <button
                      onClick={() => handleWhatsappClick(product, "outOfStock")}
                      className="flex items-center"
                    >
                      <WhatsappLogo size={24} color="#25D366" />
                      <span className="ml-1">Check alternatives</span>
                    </button>
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
  );
};

export default ProductList;
