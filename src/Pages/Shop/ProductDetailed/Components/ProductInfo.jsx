import Container from "Components/Container/Container";
import React, { useState, useContext, useEffect } from "react";
import Spinner from "Components/RequestHandler/Spinner";
import { Heart } from "@phosphor-icons/react";
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
  } = useContext(UserCartContext);

  const { getWishlistData, userAddToWihlist, addTowishlistLoading, wishlist } =
    useContext(UserWishlistContext);

  const addToCartHandler = (product) => {
    displayProductHandler(product);
    if (userIsSignIn) {
      userAddToCart(product?.id);
    } else {
      addToCart(product);
    }
  };
  const addToWishlitandler = (product) => {
    if (userIsSignIn) {
      userAddToWihlist(product?.id);
    } else {
      userAddToWihlist(product);
    }
  };

  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
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
        setQuantity(0);
      }
    } else if (!userIsSignIn && guestCart) {
      const foundItem = guestCart.find((item) => item.id === product.id);
      if (foundItem) {
        setIsInCart(true);
        setQuantity(foundItem.quantity);
      } else {
        setIsInCart(false);
        setQuantity(0);
      }
    }

    if (wishlist) {
      const foundWishlistItem = wishlist?.wishlist?.find(
        (item) => item.id === product.id
      );
      setIsInWishlist(!!foundWishlistItem);
    }
  }, [cart, product.id, guestCart, userIsSignIn, wishlist]);

  const handleQuantityChange = (productId, quantity) => {
    if (userIsSignIn) {
      if (quantity < 1) {
        removeFromCart(productId);
      } else {
        updateCart(productId, quantity);
      }
    } else if (!userIsSignIn) {
      if (quantity < 1) {
        guestRemoveFromCart(productId);
      } else {
        guestUpdateCart(productId, quantity);
      }
    }
  };

  return (
    <Container>
      <div className="flex flex-col flex-col-reverse lg:flex-row items-center gap-y-6 gap-x-32 py-secondary lg:py-primary">
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
            <div className="flex-1 rb-bold text-white flex items-center bg-dark">
              <p className="border-r px-6 py-3">Qty</p>
              <button
                disabled={!isInCart}
                className="flex items-center justify-between flex-1 px-10 gap-x-2"
              >
                <p
                  onClick={() =>
                    handleQuantityChange(product?.id, quantity + 1)
                  }
                >
                  +
                </p>
                {updateCartIsLoading ? <Spinner /> : <p>{quantity}</p>}
                <p
                  onClick={() =>
                    handleQuantityChange(product?.id, quantity - 1)
                  }
                >
                  -
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
          </div>

          <div className="mt-10">
            <p className=" mb-2">
              After placing your order, our team will promptly contact you to
              arrange a convenient time and location for delivery and
              installation of your items. <br /> We’re committed to providing
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
        <div className="flex-1 flex flex-col items-center justify-center p-12">
          <img className="w-3/4 h-3/4 mx-auto" src={image} alt="" />
          {/* <img className="w-3/4 h-3/4 mx-auto" src={product?.images} alt="" /> */}
        </div>
      </div>
    </Container>
  );
};

export default ProductInfo;
