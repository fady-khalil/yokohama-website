import React, { createContext, useState, useEffect, useContext } from "react";
import { DealerLoginContext } from "context/Auth/DealerContext";
// fetching data
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import usePostToken from "Hooks/Fetching/usePostToken";

export const DealerCartContext = createContext();

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

export const DealerCartProvider = ({ children }) => {
  const { dealerToken, dealerIsSignIn } = useContext(DealerLoginContext);
  const [displayProduct, setDisplayProduct] = useState("");
  // fetcing
  const { error, fetchData } = useGetDataToken();
  const { error: postAddToCartError, postData } = usePostToken();

  // get cart
  const [cart, setCart] = useState([]);
  const [cartIsLoading, setCartIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Local cart state
  const [localCart, setLocalCart] = useState([]);
  const [isLocalCartMode, setIsLocalCartMode] = useState(true);
  const [hasExistingOdooCart, setHasExistingOdooCart] = useState(false);

  // add to cart
  const [addToCartLoading, setAddToCartLoading] = useState({});

  // delete item from cart
  const [loadingItems, setLoadingItems] = useState({});

  // update cart
  const [updateCartLoading, setUpdateCartLoading] = useState({});

  // Check for existing cart on app init
  useEffect(() => {
    if (dealerIsSignIn) {
      // Check for existing cart in Odoo when dealer is signed in
      getCartData();
    } else {
      // Reset cart for non-signed in case (shouldn't happen for dealers)
      setCart([]);
      setLocalCart([]);
    }
  }, [dealerIsSignIn]);

  // Load from local storage when in local cart mode
  useEffect(() => {
    if (isLocalCartMode && dealerIsSignIn) {
      // Load from local storage
      const storedCart = getWithExpiry("dealerCart");
      if (storedCart) {
        setLocalCart(storedCart);
        setCart({ cart_items: storedCart }); // Format to match Odoo cart structure
      } else {
        setLocalCart([]);
        setCart({ cart_items: [] });
      }
    }
  }, [isLocalCartMode, dealerIsSignIn]);

  const displayProductHandler = (product) => {
    setDisplayProduct(product);
  };

  const getCartData = async () => {
    try {
      setCartIsLoading(true);
      const cartData = await fetchData("yokohama/cart/mine", dealerToken);
      console.log(cartData, "cart context");

      // Check if there's an existing Odoo cart with items
      if (
        cartData?.data?.cart_items?.length > 0 ||
        cartData?.data?.length > 0
      ) {
        setHasExistingOdooCart(true);
        setIsLocalCartMode(false);
        setCart(cartData?.data);
      } else {
        setHasExistingOdooCart(false);
        setIsLocalCartMode(true);
        // Load local cart
        const storedCart = getWithExpiry("dealerCart");
        if (storedCart) {
          setLocalCart(storedCart);
          setCart({ cart_items: storedCart });
        } else {
          setLocalCart([]);
          setCart({ cart_items: [] });
        }
      }
    } catch (error) {
      setIsError(true);
      console.error("Error fetching cart data:", error);
    } finally {
      setCartIsLoading(false);
    }
  };

  // Add to Odoo cart - only used when dealer has existing Odoo cart
  const AddToCart = async (productId, quantity = 1) => {
    // If NOT in local cart mode (has existing Odoo cart)
    if (!isLocalCartMode) {
      try {
        setAddToCartLoading((prev) => ({ ...prev, [productId]: true }));
        const addToCartData = await postData(
          `yokohama/cart/${productId}`,
          dealerToken
        );

        if (addToCartData?.is_success) {
          getCartData();
        }
        return addToCartData?.is_success;
      } catch (error) {
        console.error("Error adding to cart:", error);
        return false;
      } finally {
        setAddToCartLoading((prev) => ({ ...prev, [productId]: false }));
      }
    } else {
      // If in local mode, add to local cart instead
      addToLocalCart({ id: productId, quantity });
      return true;
    }
  };

  // Add to local cart
  const addToLocalCart = (product) => {
    // Don't use local cart if we're not in local cart mode
    if (!isLocalCartMode) {
      console.warn("Attempted to add to local cart while in Odoo cart mode");
      AddToCart(product.id, product.quantity || 1);
      return;
    }

    console.log("Adding product to local cart:", product);

    if (!product || (!product.id && !product.product_id)) {
      console.error("Invalid product provided to addToLocalCart", product);
      return;
    }

    const productId = product.id || product.product_id;

    // Check if product already exists in cart
    const existingItemIndex = localCart.findIndex(
      (item) => item.id === productId || item.product_id === productId
    );

    console.log("Product exists in cart:", existingItemIndex >= 0);

    if (existingItemIndex >= 0) {
      // Update quantity if product exists
      const updatedCart = [...localCart];
      const newQuantity =
        (product.quantity || 1) +
        (updatedCart[existingItemIndex].quantity || 0);

      console.log("Updating quantity for existing product:", {
        oldQuantity: updatedCart[existingItemIndex].quantity,
        newQuantity: newQuantity,
      });

      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: newQuantity,
      };
      setLocalCart(updatedCart);
      setCart({ cart_items: updatedCart }); // Format to match Odoo cart structure
      setWithExpiry("dealerCart", updatedCart, 12 * 60 * 60 * 1000);
    } else {
      // Add new product - ensure we have all required fields
      const cartItem = {
        ...product,
        id: productId,
        product_id: productId,
        quantity: product.quantity || 1,
        name: product.name || "Product",
        price: product.price || product.dealer_price?.price || 0,
        retail_price:
          product.retail_price || product.dealer_price?.retail_price || 0,
        currency: product.currency || "$",
        image: product.image || null,
      };

      const updatedCart = [...localCart, cartItem];
      setLocalCart(updatedCart);
      setCart({ cart_items: updatedCart }); // Format to match Odoo cart structure
      setWithExpiry("dealerCart", updatedCart, 12 * 60 * 60 * 1000);
    }
  };

  // Add multiple products to Odoo cart
  // HERE WE NEED TO FIX IT BY USING MULTIPLE LIKE THE USER CART
  const addProductsToOdooCart = async (products) => {
    try {
      let success = true;

      for (const product of products) {
        const productId = product.id || product.product_id;
        const quantity = product.quantity || 1;

        setAddToCartLoading((prev) => ({ ...prev, [productId]: true }));
        const addToCartData = await postData(
          `yokohama/cart/${productId}`,
          dealerToken
        );
        setAddToCartLoading((prev) => ({ ...prev, [productId]: false }));

        if (!addToCartData?.is_success) {
          success = false;
        }
      }

      // Refresh cart data
      if (success) {
        await getCartData();
      }

      return success;
    } catch (error) {
      console.error("Error adding products to Odoo cart:", error);
      return false;
    }
  };

  const updateCart = async (productId, quantity) => {
    // If NOT in local cart mode
    if (!isLocalCartMode) {
      try {
        setUpdateCartLoading((prev) => ({ ...prev, [productId]: true }));
        const dataUpdatedData = await fetchData(
          `/yokohama/cart/update/${productId}?quantity=${quantity}`,
          dealerToken
        );
        setCart(dataUpdatedData?.data);
      } catch (error) {
        console.error("Error updating cart:", error);
      } finally {
        setUpdateCartLoading((prev) => ({ ...prev, [productId]: false }));
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
      setWithExpiry("dealerCart", updatedCart, 12 * 60 * 60 * 1000); // 12 hours
    }
  };

  const removeFromCart = async (productId) => {
    // If NOT in local cart mode
    if (!isLocalCartMode) {
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
    } else {
      // Remove from local cart
      const updatedCart = localCart.filter(
        (item) => item.id !== productId && item.product_id !== productId
      );
      setLocalCart(updatedCart);
      setCart({ cart_items: updatedCart }); // Format to match Odoo cart structure
      setWithExpiry("dealerCart", updatedCart, 12 * 60 * 60 * 1000);
    }
  };

  const clearCart = () => {
    setCart([]);
    setLocalCart([]);
    localStorage.removeItem("dealerCart");
  };

  return (
    <DealerCartContext.Provider
      value={{
        // display product
        displayProductHandler,
        displayProduct,
        // cart state
        cart,
        cartIsLoading,
        // local cart
        localCart,
        isLocalCartMode,
        hasExistingOdooCart,
        addToLocalCart,
        // odoo cart operations
        AddToCart,
        addProductsToOdooCart,
        addToCartLoading,
        // cart operations
        removeFromCart,
        loadingItems,
        updateCart,
        updateCartLoading,
        clearCart,
      }}
    >
      {children}
    </DealerCartContext.Provider>
  );
};
