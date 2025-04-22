import React, { createContext, useState, useEffect, useContext } from "react";
import { UserLoginContext } from "context/Auth/UserLoginContext";
// fetching data
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import usePostToken from "Hooks/Fetching/usePostToken";

export const UserCartContext = createContext();

// Local storage utility functions with expiry
const setWithExpiry = (key, value, ttl) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export const UserCartProvider = ({ children }) => {
  const { userToken, userIsSignIn } = useContext(UserLoginContext);
  const [displayProduct, setDisplayProduct] = useState("");
  // fetcing
  const { fetchData } = useGetDataToken();
  const { postData } = usePostToken();

  // payment states
  const [paymentRef, setPaymentRef] = useState(null);
  const [orderId, setOrderId] = useState(null);

  // get cart
  const [cart, setCart] = useState([]);
  const [cartIsLoading, setCartIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Local cart state
  const [localCart, setLocalCart] = useState([]);
  const [hasExistingOdooCart, setHasExistingOdooCart] = useState(false);
  const [isLocalCartMode, setIsLocalCartMode] = useState(true);

  // add to cart
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  // update cart
  const [updateCartIsLoading, setUpdateCartIsLoading] = useState(false);

  // delete item from cart
  const [loadingItems, setLoadingItems] = useState({});

  // Check for existing cart on app init
  useEffect(() => {
    if (userIsSignIn) {
      // Check for existing cart in Odoo when user is signed in
      getCartData();
    } else {
      // If not signed in, first check if there's an active Odoo cart
      checkForExistingOdooCart();
    }
  }, [userIsSignIn]);

  // Load from local storage when in local cart mode
  useEffect(() => {
    if (isLocalCartMode && !userIsSignIn) {
      // Load from local storage
      const storedCart = getWithExpiry("userCart");
      if (storedCart) {
        setLocalCart(storedCart);
        setCart({ cart_items: storedCart }); // Format to match Odoo cart structure
      } else {
        setLocalCart([]);
        setCart({ cart_items: [] });
      }
    }
  }, [isLocalCartMode, userIsSignIn]);

  // Check if there's an existing Odoo cart for non-logged in users
  const checkForExistingOdooCart = async () => {
    try {
      setCartIsLoading(true);
      const cartData = await fetchData("yokohama/cart/mine", userToken);

      if (
        cartData?.data?.cart_items?.length > 0 ||
        cartData?.data?.length > 0
      ) {
        // Existing Odoo cart found
        setHasExistingOdooCart(true);
        setIsLocalCartMode(false);
        setCart(cartData?.data);
        console.log("Existing Odoo cart detected, using Odoo cart mode");
      } else {
        // No existing Odoo cart
        setHasExistingOdooCart(false);
        setIsLocalCartMode(true);
        console.log("No existing Odoo cart, using local cart mode");
      }
    } catch (error) {
      console.error("Error checking for existing Odoo cart:", error);
      setIsLocalCartMode(true); // Default to local mode on error
    } finally {
      setCartIsLoading(false);
    }
  };

  const displayProductHandler = (product) => {
    setDisplayProduct(product);
  };

  const getCartData = async () => {
    try {
      setCartIsLoading(true);
      const cartData = await fetchData("yokohama/cart/mine", userToken);
      setCart(cartData?.data);

      // Check if there's an existing Odoo cart with items
      if (cartData?.data?.cart_items?.length > 0) {
        setHasExistingOdooCart(true);
        setIsLocalCartMode(false);
      } else {
        setHasExistingOdooCart(false);
        // Only set to local mode if not signed in
        if (!userIsSignIn) {
          setIsLocalCartMode(true);
        }
      }
    } catch (error) {
      setIsError(true);
      console.error("Error fetching cart data:", error);
    } finally {
      setCartIsLoading(false);
    }
  };

  // Add to Odoo cart - only used when user is signed in or has existing Odoo cart
  const userAddToCart = async (productId, quantity = 1) => {
    try {
      setAddToCartLoading(true);
      const addToCartData = await postData(
        `yokohama/cart/${productId}`,
        userToken
      );

      if (addToCartData?.is_success) {
        getCartData();
      }
      return addToCartData?.is_success;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return false;
    } finally {
      setAddToCartLoading(false);
    }
  };

  // Add multiple products to Odoo cart
  const addProductsToOdooCart = async (products) => {
    try {
      setAddToCartLoading(true);
      let success = true;

      for (const product of products) {
        const productId = product.id || product.product_id;
        const quantity = product.quantity || 1;

        const result = await userAddToCart(productId, quantity);
        if (!result) {
          success = false;
        }
      }

      return success;
    } catch (error) {
      console.error("Error adding products to Odoo cart:", error);
      return false;
    } finally {
      setAddToCartLoading(false);
    }
  };

  const updateCart = async (productId, quantity) => {
    // If NOT in local cart mode (user is signed in OR we have an existing Odoo cart)
    if (!isLocalCartMode) {
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
    } else {
      // Update local cart
      const updatedCart = localCart.map((item) =>
        item.id === productId || item.product_id === productId
          ? { ...item, quantity }
          : item
      );
      setLocalCart(updatedCart);
      setCart({ cart_items: updatedCart }); // Format to match Odoo cart structure
      setWithExpiry("userCart", updatedCart, 12 * 60 * 60 * 1000); // 12 hours
    }
  };

  const addToLocalCart = (product) => {
    // Don't use local cart if we're not in local cart mode
    if (!isLocalCartMode) {
      console.warn("Attempted to add to local cart while in Odoo cart mode");
      userAddToCart(product.id, product.quantity || 1);
      return;
    }

    // Check if product already exists in cart
    const existingItemIndex = localCart.findIndex(
      (item) => item.id === product.id || item.product_id === product.id
    );

    if (existingItemIndex >= 0) {
      // Update quantity if product exists
      const updatedCart = [...localCart];
      const newQuantity =
        (product.quantity || 1) +
        (updatedCart[existingItemIndex].quantity || 0);

      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: newQuantity,
      };
      setLocalCart(updatedCart);
      setCart({ cart_items: updatedCart }); // Format to match Odoo cart structure
      setWithExpiry("userCart", updatedCart, 12 * 60 * 60 * 1000);
    } else {
      // Add new product
      const cartItem = {
        ...product,
        product_id: product.id,
        quantity: product.quantity || 1,
      };
      const updatedCart = [...localCart, cartItem];
      setLocalCart(updatedCart);
      setCart({ cart_items: updatedCart }); // Format to match Odoo cart structure
      setWithExpiry("userCart", updatedCart, 12 * 60 * 60 * 1000);
    }
  };

  const removeFromCart = async (productId) => {
    // If NOT in local cart mode (user is signed in OR we have an existing Odoo cart)
    if (!isLocalCartMode) {
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
    } else {
      // Remove from local cart
      const updatedCart = localCart.filter(
        (item) => item.id !== productId && item.product_id !== productId
      );
      setLocalCart(updatedCart);
      setCart({ cart_items: updatedCart }); // Format to match Odoo cart structure
      setWithExpiry("userCart", updatedCart, 12 * 60 * 60 * 1000);
    }
  };

  const clearCart = () => {
    setCart([]);
    setLocalCart([]);
    localStorage.removeItem("userCart");
  };

  return (
    <UserCartContext.Provider
      value={{
        // payment states
        paymentRef,
        setPaymentRef,
        orderId,
        setOrderId,
        // display product
        displayProductHandler,
        displayProduct,
        // cart state
        cart,
        cartIsLoading,
        // local cart
        localCart,
        addToLocalCart,
        isLocalCartMode,
        hasExistingOdooCart,
        // odoo cart operations
        userAddToCart,
        addProductsToOdooCart,
        addToCartLoading,
        // cart operations
        removeFromCart,
        loadingItems,
        updateCart,
        clearCart,
        updateCartIsLoading,
      }}
    >
      {children}
    </UserCartContext.Provider>
  );
};
