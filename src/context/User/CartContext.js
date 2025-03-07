import React, { createContext, useState, useEffect, useContext } from "react";
import { UserLoginContext } from "context/Auth/UserLoginContext";
// fetching data
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import usePostToken from "Hooks/Fetching/usePostToken";

export const UserCartContext = createContext();

export const UserCartProvider = ({ children }) => {
  const { userToken, userIsSignIn } = useContext(UserLoginContext);
  const [displayProduct, setDisplayProduct] = useState("");
  // fetcing
  const { fetchData } = useGetDataToken();
  const { postData } = usePostToken();

  // get cart
  const [cart, setCart] = useState([]);
  const [cartIsLoading, setcCatIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // add to cart
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  // update cart
  const [updateCartIsLoading, setUpdateCartIsLoading] = useState(false);

  // detel item from car
  const [loadingItems, setLoadingItems] = useState({});

  useEffect(() => {
    if (userIsSignIn) {
      getCartData();
    } else {
      setCart([]);
    }
  }, [userIsSignIn]);

  const displayProductHandler = (product) => {
    setDisplayProduct(product);
  };

  const getCartData = async () => {
    try {
      setcCatIsLoading(true);
      const cartData = await fetchData("yokohama/cart/mine", userToken);
      setCart(cartData?.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setcCatIsLoading(false);
    }
  };

  const userAddToCart = async (productId) => {
    try {
      setAddToCartLoading(true);
      const addToCartData = await postData(
        `yokohama/cart/${productId}`,
        userToken
      );

      if (addToCartData?.is_success) {
        getCartData();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAddToCartLoading(false);
    }
  };

  const updateCart = async (productId, quantity) => {
    try {
      setUpdateCartIsLoading(true);
      const dataUpdatedData = await fetchData(
        `/yokohama/cart/update/${productId}?quantity=${quantity}`,
        userToken
      );
      setCart(dataUpdatedData?.data);
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setUpdateCartIsLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoadingItems((prev) => ({ ...prev, [productId]: true }));
      const deletItemData = await fetchData(
        `yokohama/cart/delete/${productId}`,
        userToken
      );
      if (deletItemData?.is_success) {
        setCart(deletItemData?.data);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <UserCartContext.Provider
      value={{
        // display product
        displayProductHandler,
        displayProduct,
        // get cart
        cart,
        cartIsLoading,
        // add to cart
        userAddToCart,
        addToCartLoading,
        // delet item from cat
        removeFromCart,
        loadingItems,

        // update products
        updateCart,
        clearCart,
        updateCartIsLoading,
        // billing
      }}
    >
      {children}
    </UserCartContext.Provider>
  );
};
