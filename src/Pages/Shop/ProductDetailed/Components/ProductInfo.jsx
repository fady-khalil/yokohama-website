import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "Components/Container/Container";
import Spinner from "Components/RequestHandler/Spinner";
import {
  Heart,
  Trash,
  ShoppingCart,
  WhatsappLogo,
  CaretLeft,
} from "@phosphor-icons/react";
import logo from "assests/brand-cart.jpg";
import icon from "assests/Auth/y1/y1.png";
import image from "assests/product-3-removebg-preview.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Contexts
import { UserLoginContext } from "context/Auth/UserLoginContext";
import { UserCartContext } from "context/User/CartContext";
import { UserWishlistContext } from "context/User/WishlistContext";

// Constants
const POPUP_TIMEOUT = 5000;

const ProductInfo = ({ product }) => {
  console.log("ProductInfo", product);
  const navigate = useNavigate();
  const { userIsSignIn, userData } = useContext(UserLoginContext);
  const {
    addToCart,
    cart,
    updateQuantity,
    removeFromCart,
    isAddingToCart,
    loadingItems,
    displayProductHandler,
  } = useContext(UserCartContext);

  const { getWishlistData, userAddToWihlist, addTowishlistLoading, wishlist } =
    useContext(UserWishlistContext);

  // UI states
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showStockPopup, setShowStockPopup] = useState(false);
  const [isLoadingWhatsapp, setIsLoadingWhatsapp] = useState(false);

  // Check if product is in cart & wishlist when cart or wishlist changes
  useEffect(() => {
    // Check cart status
    if (cart && Array.isArray(cart)) {
      const foundItem = cart.find(
        (item) => item.id === product.id || item.product_id === product.id
      );

      if (foundItem) {
        setIsInCart(true);
        setQuantity(foundItem.quantity);
      } else {
        setIsInCart(false);
        setQuantity(1);
      }
    }

    // Check wishlist status
    if (wishlist) {
      const foundWishlistItem = wishlist?.wishlist?.find(
        (item) => item.id === product.id
      );
      setIsInWishlist(!!foundWishlistItem);
    }
  }, [cart, product.id, wishlist]);

  // Handle quantity changes with stock validation
  const handleQuantityChange = (productId, newQuantity) => {
    const freeQuantity = product?.quantity?.free_quantity;

    // Validate against available stock
    if (freeQuantity && newQuantity > freeQuantity) {
      setQuantity(freeQuantity);
      setShowStockPopup(true);

      if (isInCart) {
        updateQuantity(productId, freeQuantity);
      }
      return;
    }

    // Prevent negative quantities
    if (newQuantity < 1) {
      return;
    }

    setQuantity(newQuantity);

    if (isInCart) {
      updateQuantity(productId, newQuantity);
    }
  };

  // Add to cart handler
  const addToCartHandler = async (product) => {
    displayProductHandler(product);
    await addToCart(product, quantity);

    // After adding to cart successfully, the cart state will be updated
    // which will trigger the useEffect that sets isInCart to true
    // This will automatically hide the "Add to Cart" button

    setTimeout(() => {
      setShowPopup(true);
    }, 800);
  };

  // Add to wishlist handler
  const addToWishlistHandler = (product) => {
    if (userIsSignIn) {
      userAddToWihlist(product?.id);
    } else {
      userAddToWihlist(product);
    }
  };

  // Auto-dismiss popup after timeout
  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setTimeout(() => {
        setShowPopup(false);
      }, POPUP_TIMEOUT);
    }
    return () => clearTimeout(timer);
  }, [showPopup]);

  // Auto-dismiss stock popup after timeout
  useEffect(() => {
    let timer;
    if (showStockPopup) {
      timer = setTimeout(() => {
        setShowStockPopup(false);
      }, POPUP_TIMEOUT);
    }
    return () => clearTimeout(timer);
  }, [showStockPopup]);

  // Handle WhatsApp contact functionality
  const handleWhatsappClick = async (stockStatus) => {
    setIsLoadingWhatsapp(true);

    let message = "I'm interested in this product:";

    // Customize message based on stock status
    if (stockStatus === "outOfStock") {
      message = `Hello, ${
        userIsSignIn
          ? `My Name is ${userData?.first_name} ${userData?.last_name}, `
          : ""
      } I'd like to check for alternatives for this product: ${product?.name}`;
    } else if (stockStatus === "comingSoon") {
      message = `Hello, ${
        userIsSignIn
          ? `My Name is ${userData?.first_name} ${userData?.last_name}, `
          : ""
      } I'd like to know when this product will be available: ${product?.name}`;
    }

    try {
      const phoneNumber = "96103010958";
      const encodedMessage = encodeURIComponent(`${message} `);

      // Create WhatsApp link
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Error handling WhatsApp click:", error);
    } finally {
      setIsLoadingWhatsapp(false);
    }
  };

  // Render appropriate stock status message and buttons
  const renderStockStatus = () => {
    const { free_quantity, incoming_quantity } = product?.quantity || {};

    if (free_quantity === 0 && incoming_quantity === 0) {
      return (
        <>
          <p className="mb-2">
            This product is currently out of stock. Talk to an expert to explore
            alternative products. Don't worry, we always have options for you.
          </p>
          <button
            className="flex items-center gap-x-2 mt-4"
            onClick={() => handleWhatsappClick("outOfStock")}
            disabled={isLoadingWhatsapp}
          >
            <span className="block text-6xl bg-[#25D366] rounded-xl">
              <WhatsappLogo color="white" />
            </span>
            {isLoadingWhatsapp ? "Loading..." : "Talk to an Expert"}
          </button>
        </>
      );
    }

    if (free_quantity === 0 && incoming_quantity > 0) {
      return (
        <>
          <p className="mb-2">
            Coming soon! Contact us to find out the expected availability date
            and more details.
          </p>
          <button
            className="flex items-center gap-x-2 mt-4"
            onClick={() => handleWhatsappClick("comingSoon")}
            disabled={isLoadingWhatsapp}
          >
            <span className="block text-6xl bg-[#25D366] rounded-xl">
              <WhatsappLogo color="white" />
            </span>
            {isLoadingWhatsapp ? "Loading..." : "Contact Us"}
          </button>
        </>
      );
    }

    return (
      <>
        <p className="mb-2">
          After placing your order, our team will promptly contact you to
          arrange a convenient time and location for delivery and installation
          of your items. <br /> We're committed to providing you with seamless
          service.
        </p>
        <p className="text-lg">Thank you for choosing us!</p>
        <button
          className="flex items-center gap-x-2 mt-4"
          onClick={() => handleWhatsappClick("inStock")}
          disabled={isLoadingWhatsapp}
        >
          <span className="block text-6xl bg-[#25D366] rounded-xl">
            <WhatsappLogo color="white" />
          </span>
          {isLoadingWhatsapp ? "Loading..." : "Need Help?"}
        </button>
      </>
    );
  };

  // Function to handle going back
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      {/* Breadcrumb Navigation */}
      <div className="flex items-center py-4 mb-2">
        <button
          onClick={handleGoBack}
          className="flex items-center text-primary hover:underline"
        >
          <CaretLeft size={20} weight="bold" />
          <span className="ml-1">Back</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-y-6 gap-x-32 py-secondary lg:py-primary">
        {/* Product Image */}
        <div className="flex-1 flex flex-col items-center justify-center p-12">
          <img
            className="lg:w-3/4 lg:h-3/4 mx-auto"
            src={product?.images}
            alt={product?.name}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          {/* Brand/Category */}
          <div className="flex items-center gap-x-16 border-b pb-4">
            <img className="w-32" src={logo} alt="Brand logo" />
          </div>

          {/* Name */}
          <div className="flex items-center justify-between my-6">
            <p className="text-2xl">{product?.name}</p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-x-6">
            <p className="text-lg rb-medium line-through text-red-600">
              {product?.price} {product?.currency}
            </p>
            <p className="text-2xl rb-medium">
              {product?.retail_price} {product?.currency}
            </p>
          </div>

          {/* Specifications */}
          <div className="hidden sm:flex gap-x-6 my-8">
            <p className="text text-primary rb-bold">{product?.pattern}</p>
            <img className="h-6 w-6" src={icon} alt="" />
            <p className="text text-primary rb-bold">{product?.series}</p>
            <img className="h-6 w-6" src={icon} alt="" />
            <p className="text text-primary rb-bold">
              {product?.classification}
            </p>
          </div>

          {/* Add to Cart Controls (only show if product is in stock) */}
          {product?.quantity?.free_quantity > 0 && (
            <div className="flex items-center gap-x-1 my-8 sm:my-0">
              {/* Quantity Controls */}
              <div
                className={`${
                  isInCart ? "flex-[10]" : "flex-[1] "
                } rb-bold text-white flex items-center bg-dark relative`}
              >
                <button className="flex items-center flex-1 justify-between px-10 gap-x-2 px-6 py-3">
                  <p
                    onClick={() =>
                      handleQuantityChange(
                        product?.id,
                        Math.max(1, quantity - 1)
                      )
                    }
                  >
                    -
                  </p>
                  {loadingItems[product.id] ? <Spinner /> : <p>{quantity}</p>}
                  <p
                    onClick={() =>
                      handleQuantityChange(product?.id, quantity + 1)
                    }
                  >
                    +
                  </p>
                </button>

                {/* Stock Limit Popup */}
                <span
                  className={`absolute border border-primary shadow-2xl bg-white text-black flex flex-col w-full h-auto rounded-lg p-4 bottom-[110%] left-0 z-[100] ${
                    showStockPopup
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  } transition-all duration-300`}
                >
                  <div className="border-b border-primary pb-2">
                    <p className="text-amber-600 font-medium">
                      Limited Stock Notice
                    </p>
                  </div>
                  <div className="my-4">
                    <p>
                      Sorry, we have only {product?.quantity?.free_quantity}{" "}
                      unit
                      {product?.quantity?.free_quantity !== 1 ? "s" : ""}{" "}
                      available in stock.
                    </p>
                  </div>
                </span>

                {/* Add to Cart Success Popup */}
                <span
                  className={`absolute border border-primary shadow-2xl bg-white text-black flex flex-col w-full h-auto rounded-lg p-4 bottom-[110%] left-0 z-[100] ${
                    showPopup ? "opacity-100 visible" : "opacity-0 invisible"
                  } transition-all duration-300`}
                >
                  <div className="border-b border-primary pb-2">
                    <p>Item(s) added to your cart</p>
                  </div>
                  <div className="flex items-center gap-x-2 my-4">
                    <span className="flex-1">
                      <img src={product?.images || image} alt="" />
                    </span>
                    <span className="flex-[2]">
                      <p className="text-sm r">{product.name}</p>
                    </span>
                    <span className="flex-1 text-center block">
                      <p>
                        {product.retail_price} {product.currency}
                      </p>
                    </span>
                  </div>
                  <Link
                    className="border rounded-2xl text-center min-w-[fit-content] flex-1 flex items-center justify-center gap-x-2 capitalize bg-primary text-white py-1"
                    to="/my-cart"
                  >
                    View Cart
                  </Link>
                </span>
              </div>

              {/* Add to Cart Button - only show if not already in cart */}
              {!isInCart && (
                <div className="flex-1">
                  <button
                    onClick={() => addToCartHandler(product)}
                    className="bg-primary text-white rb-bold w-full text-center grid py-3 flex items-center justify-center gap-x-2"
                  >
                    {isAddingToCart ? <Spinner /> : "Add To Cart"}
                  </button>
                </div>
              )}

              {/* Wishlist Button */}
              {!isInCart && (
                <button
                  onClick={() => addToWishlistHandler(product)}
                  className={`min-w-[45px] lg:min-w-[75px] flex items-center justify-center py-2 w-max ${
                    isInWishlist ? "text-primary" : ""
                  }`}
                >
                  {addTowishlistLoading ? (
                    <Spinner />
                  ) : (
                    <Heart
                      weight={isInWishlist ? "fill" : "regular"}
                      size={24}
                    />
                  )}
                </button>
              )}

              {/* Remove from Cart Button */}
              {isInCart && (
                <button
                  onClick={() => removeFromCart(product?.id)}
                  title="Remove from cart"
                  className="min-w-[75px] flex-1 flex items-center justify-center py-2 w-max"
                >
                  {loadingItems[product?.id] ? (
                    <Spinner />
                  ) : (
                    <Trash size={24} />
                  )}
                </button>
              )}

              {/* Go to Cart Button */}
              {isInCart && (
                <Link
                  to="/my-cart"
                  title="Go to cart"
                  className="hover:underline rb-bold w-full text-center py-3 flex items-center justify-center gap-x-2 flex flex-1"
                >
                  <ShoppingCart size={24} />
                </Link>
              )}
            </div>
          )}

          {/* Stock Status */}
          <div className="mt-10">{renderStockStatus()}</div>
        </div>
      </div>
    </Container>
  );
};

export default ProductInfo;
