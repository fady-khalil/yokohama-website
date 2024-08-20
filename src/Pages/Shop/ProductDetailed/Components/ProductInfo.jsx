import Container from "Components/Container/Container";
import React, { useState, useContext, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// context
import { UserLoginContext } from "context/Auth/UserLoginContext";
import { GuestCartContext } from "context/Guest/GuestCartContext";
import { UserCartContext } from "context/User/CartContext";
import Spinner from "Components/RequestHandler/Spinner";

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
    removeFromCart,
  } = useContext(UserCartContext);

  const addToCartHandler = (product) => {
    displayProductHandler(product);
    if (userIsSignIn) {
      userAddToCart(product?.id);
    } else {
      addToCart(product);
    }
  };

  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);

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
  }, [cart, product.id, guestCart, userIsSignIn]);

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
          <div className="flex items-center gap-x-16 border-b pb-4">
            <img className="w-32" src={product?.category?.[0]?.image} alt="" />
            <p className="text-2xl capitalize">
              {product?.category?.[0]?.name}
            </p>
          </div>
          <div className="flex items-center justify-between my-4">
            <p className="text-2xl">{product?.name}</p>
            <p
              className="my-3 text-sm rb-medium"
              dangerouslySetInnerHTML={{ __html: product?.description }}
            />
          </div>

          <div className="flex items-center mb-3 gap-x-2">
            <p className="text-2xl rb-light">
              {product?.price} {product?.currency}
            </p>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-b">
            {product?.feature_ids &&
              product?.feature_ids.map(({ icon, text }, index) => (
                <div className="flex flex-col" key={index}>
                  <img
                    className="w-6 h-6 lg:w-10 lg:h-10 mb-2"
                    src={icon}
                    alt=""
                  />
                  <p className="rb-bold text-sm sm:text-base">{text}</p>
                </div>
              ))}
          </div>

          <div className="flex my-6 gap-x-3 rb-medium">
            <div className="flex-1 flex items-center gap-x-2 border">
              <p className="border-r px-4 py-3">Size</p>
              <p className="px-2">{product?.size}</p>
            </div>
          </div>

          <div className="flex gap-x-3">
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
                <p>{quantity}</p>
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
          </div>

          <button className="mt-6 uppercase underline rb-bold">
            Ask an expert
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-12">
          <img className="w-3/4 h-3/4 mx-auto" src={product?.images} alt="" />
        </div>
      </div>
    </Container>
  );
};

export default ProductInfo;
