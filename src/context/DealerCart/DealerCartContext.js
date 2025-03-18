import React, { createContext, useState, useEffect, useContext } from "react";
import { DealerLoginContext } from "context/Auth/DealerContext";
// fetching data
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import usePostToken from "Hooks/Fetching/usePostToken";

export const DealerCartContext = createContext();

export const DealerCartProvider = ({ children }) => {
  const { dealerToken, dealerIsSignIn } = useContext(DealerLoginContext);
  const [displayProduct, setDisplayProduct] = useState("");
  // fetcing
  const { error, fetchData } = useGetDataToken();
  const { error: postAddToCartError, postData } = usePostToken();

  // get cart
  const [cart, setCart] = useState([]);
  const [cartIsLoading, setcCatIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // add to cart
  const [addToCartLoading, setAddToCartLoading] = useState({});

  // detel item from car
  const [loadingItems, setLoadingItems] = useState({});

  // useEffect(() => {
  //   if (dealerIsSignIn) {
  //     getCartData();
  //   }
  // }, [dealerIsSignIn]);

  const displayProductHandler = (product) => {
    setDisplayProduct(product);
  };

  const getCartData = async () => {
    try {
      setcCatIsLoading(true);
      const cartData = await fetchData("yokohama/cart/mine", dealerToken);
      setCart(cartData?.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setcCatIsLoading(false);
    }
  };

  const AddToCart = async (productId) => {
    try {
      setAddToCartLoading((prev) => ({ ...prev, [productId]: true }));
      const addToCartData = await postData(
        `yokohama/cart/${productId}`,
        dealerToken
      );

      if (addToCartData?.is_success) {
        getCartData();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAddToCartLoading((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const updateCart = async (productId, quantity) => {
    try {
      const dataUpdatedData = await fetchData(
        `/yokohama/cart/update/${productId}?quantity=${quantity}`,
        dealerToken
      );
      setCart(dataUpdatedData?.data);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoadingItems((prev) => ({ ...prev, [productId]: true }));
      const deletItemData = await fetchData(
        `yokohama/cart/delete/${productId}`,
        dealerToken
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
    <DealerCartContext.Provider
      value={{
        // display product
        displayProductHandler,
        displayProduct,
        // get cart
        cart,
        cartIsLoading,
        // add to cart
        AddToCart,
        addToCartLoading,
        // delet item from cat
        removeFromCart,
        loadingItems,

        // update products
        updateCart,
        clearCart,
        // billing
      }}
    >
      {children}
    </DealerCartContext.Provider>
  );
};
