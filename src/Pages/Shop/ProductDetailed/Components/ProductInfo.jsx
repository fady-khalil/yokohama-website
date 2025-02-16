import Container from "Components/Container/Container";
import React, { useState, useContext, useEffect } from "react";
import Spinner from "Components/RequestHandler/Spinner";
import { Heart, Trash, ShoppingCart } from "@phosphor-icons/react";
import logo from "assests/brand-cart.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import icon from "assests/Auth/y1/y1.png";
import image from "assests/product-3-removebg-preview.png";
// context
import { UserLoginContext } from "context/Auth/UserLoginContext";
import { GuestCartContext } from "context/Guest/GuestCartContext";
import { UserCartContext } from "context/User/CartContext";
import { WhatsappLogo } from "@phosphor-icons/react";
import { UserWishlistContext } from "context/User/WishlistContext";
import { Link } from "react-router-dom";
const ProductInfo = ({ product }) => {
  const {
    addToCart,
    cart: guestCart,
    updateCart: guestUpdateCart,
    removeFromCart: guestRemoveFromCart,
  } = useContext(GuestCartContext);
  const { userIsSignIn, userToken } = useContext(UserLoginContext);
  const {
    userAddToCart,
    addToCartLoading,
    displayProductHandler,
    cart,
    updateCart,
    updateCartIsLoading,
    removeFromCart,
    loadingItems,
  } = useContext(UserCartContext);

  const { getWishlistData, userAddToWihlist, addTowishlistLoading, wishlist } =
    useContext(UserWishlistContext);

  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (userIsSignIn && cart?.cart_items) {
      const foundItem = cart.cart_items.find(
        (item) => item.product_id === product.id
      );

      if (foundItem) {
        setIsInCart(true);
        setQuantity(foundItem.quantity);
      } else {
        setIsInCart(false);
        setQuantity(1);
      }
    } else if (!userIsSignIn && guestCart) {
      const foundItem = guestCart.find((item) => item.id === product.id);
      if (foundItem) {
        setIsInCart(true);
        setQuantity(foundItem.quantity);
      } else {
        setIsInCart(false);
        setQuantity(1);
      }
    }

    if (wishlist) {
      const foundWishlistItem = wishlist?.wishlist?.find(
        (item) => item.id === product.id
      );
      setIsInWishlist(!!foundWishlistItem);
    }
  }, [cart, product.id, guestCart, userIsSignIn, wishlist]);

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantity(newQuantity);

    if (newQuantity < 1) {
      return;
    }

    if (isInCart) {
      if (userIsSignIn) {
        updateCart(productId, newQuantity);
      } else {
        guestUpdateCart(productId, newQuantity);
      }
    }
  };

  const addToCartHandler = async (product) => {
    displayProductHandler(product);
    if (userIsSignIn) {
      // First add to cart
      await userAddToCart(product?.id);
      // Then update the quantity if it's different from 1
      if (quantity > 1) {
        updateCart(product?.id, quantity);
      }
    } else {
      addToCart({ ...product, quantity });
    }
  };

  const addToWishlitandler = (product) => {
    if (userIsSignIn) {
      userAddToWihlist(product?.id);
    } else {
      userAddToWihlist(product);
    }
  };

  return (
    <Container>
      <div className="flex flex-col flex-col-reverse lg:flex-row items-center gap-y-6 gap-x-32 py-secondary lg:py-primary">
        <div className="flex-1 flex flex-col items-center justify-center p-12">
          <img className="w-3/4 h-3/4 mx-auto" src={image} alt="" />
        </div>
        <div className="flex-1">
          {/* cat */}
          <div className="flex items-center gap-x-16 border-b pb-4">
            <img className="w-32" src={logo} alt="" />
            {/* <img className="w-32" src={product?.category?.[0]?.image} alt="" /> */}
          </div>
          {/* name and description */}
          <div className="flex items-center justify-between my-6">
            <p className="text-2xl">{product?.name}</p>
          </div>

          {/* price */}
          <div className="flex items-center gap-x-6">
            <p className="text-lg rb-medium line-through text-red-600">
              {product?.price} {product?.currency}
            </p>
            <p className="text-2xl rb-medium">
              {product?.retail_price} {product?.currency}
            </p>
          </div>
          {/* specs */}
          <div className="flex gap-x-6 my-8">
            <p className="text text-primary rb-bold">{product?.pattern}</p>{" "}
            <img className="h-6 w-6" src={icon} alt={""} />
            <p className="text text-primary rb-bold">{product?.series}</p>{" "}
            <img className="h-6 w-6" src={icon} alt={""} />
            <p className="text text-primary rb-bold">
              {product?.classification}
            </p>
          </div>
          <div className="flex items-center gap-x-3">
            <div
              className={`${
                isInCart ? "flex-[10]" : "flex-[1]"
              } rb-bold text-white flex items-center bg-dark`}
            >
              <p className="border-r px-6 py-3">Qty</p>
              <button className="flex items-center flex-1 justify-between px-10 gap-x-2">
                <p
                  onClick={() =>
                    handleQuantityChange(product?.id, Math.max(1, quantity - 1))
                  }
                >
                  -
                </p>
                {updateCartIsLoading ? <Spinner /> : <p>{quantity}</p>}
                <p
                  onClick={() =>
                    handleQuantityChange(product?.id, quantity + 1)
                  }
                >
                  +
                </p>
              </button>
            </div>

            {!isInCart && (
              <div className="flex-1">
                <button
                  onClick={() => addToCartHandler(product)}
                  className="bg-primary text-white rb-bold w-full text-center py-3 flex items-center justify-center gap-x-2"
                >
                  {addToCartLoading ? <Spinner /> : " Add To Cart"}
                </button>
              </div>
            )}

            {!isInCart && (
              <button
                onClick={() => addToWishlitandler(product)}
                className={`min-w-[75px] flex items-center justify-center py-2 w-max  ${
                  isInWishlist ? "text-primary" : ""
                }`}
              >
                {addTowishlistLoading ? (
                  <Spinner />
                ) : (
                  <Heart weight={isInWishlist ? "fill" : "regular"} size={24} />
                )}
              </button>
            )}

            {isInCart && (
              <button
                onClick={() => removeFromCart(product?.id)}
                className={`min-w-[75px] flex-1 flex items-center justify-center py-2 w-max  ${
                  isInWishlist ? "text-primary" : ""
                }`}
              >
                {loadingItems[product?.id] ? (
                  <Spinner />
                ) : (
                  <Trash
                    t
                    weight={isInWishlist ? "fill" : "regular"}
                    size={24}
                  />
                )}
              </button>
            )}
            {isInCart && (
              <Link
                to={"/my-cart"}
                className="hover:underline rb-bold w-full text-center py-3 flex items-center justify-center gap-x-2 flex flex-1"
              >
                <ShoppingCart size={24} />
              </Link>
            )}
          </div>

          <div className="mt-10">
            <p className=" mb-2">
              After placing your order, our team will promptly contact you to
              arrange a convenient time and location for delivery and
              installation of your items. <br /> We're committed to providing
              you with seamless service.
            </p>
            <p className="text-lg">Thank you for choosing us!</p>

            <button className="flex items-center gap-x-2 mt-4 ">
              <span className="block text-6xl bg-[#25D366] rounded-xl">
                <WhatsappLogo color="white " />
              </span>
              Need Help?
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductInfo;
