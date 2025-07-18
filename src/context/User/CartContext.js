import React, { createContext, useState, useEffect, useContext } from "react";
import { UserLoginContext } from "context/Auth/UserLoginContext";
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import usePostDataTokenForm from "Hooks/Fetching/usePostDataTokenForm";
import usePostDataTokenJson from "Hooks/Fetching/usePostDataTokenJson";
export const UserCartContext = createContext();

// Constants
const CART_STORAGE_KEY = "yokohama_cart";
const CART_EXPIRY_DAYS = 3; // 3 days expiry

/**
 * Cart Provider that manages both local storage and Odoo backend carts
 */
export const UserCartProvider = ({ children }) => {
  const { userIsSignIn, userData, userToken } = useContext(UserLoginContext);
  const { fetchData } = useGetDataToken();
  const { fetchData: fetchDelete } = useGetDataToken();
  const { postData: postDataForm } = usePostDataTokenForm();
  const { postData: postDataJson } = usePostDataTokenJson();

  // Core cart state
  const [cart, setCart] = useState([]);
  const [intialCart, setInitialCart] = useState([]);
  const [hasOdooCart, setHasOdooCart] = useState(false);
  const [cartSummary, setCartSummary] = useState();

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [loadingItems, setLoadingItems] = useState({});

  // Product display state
  const [displayProduct, setDisplayProduct] = useState("");

  /**
   * Initialize cart on component mount and when user authentication changes
   */
  useEffect(() => {
    const initializeCart = async () => {
      setIsLoading(true);

      if (userIsSignIn) {
        // Check if user has an Odoo cart
        const hasExistingCart = await checkForOdooCart();

        if (hasExistingCart) {
          // If Odoo cart exists, use it
          await fetchOdooCart();
        } else {
          // Otherwise use localStorage cart
          loadCartFromStorage();
        }
      } else {
        // Not signed in, always use localStorage
        loadCartFromStorage();
      }

      setIsLoading(false);
    };

    initializeCart();
  }, [userIsSignIn]);

  /**
   * Check if user has an existing Odoo cart
   */
  const checkForOdooCart = async () => {
    if (!userIsSignIn || !userToken) {
      setHasOdooCart(false);
      return false;
    }

    try {
      const response = await fetchData("yokohama/cart/mine", userToken);

      // Fix: Check for response.data.cart_items instead
      if (
        response?.data?.cart_items &&
        Array.isArray(response.data.cart_items) &&
        response.data.cart_items.length > 0
      ) {
        setHasOdooCart(true);
        return true;
      }

      setHasOdooCart(false);
      return false;
    } catch (error) {
      console.error("Error checking for Odoo cart:", error);
      setHasOdooCart(false);
      return false;
    }
  };

  /**
   * Load cart from Odoo backend
   */
  const fetchOdooCart = async () => {
    console.log("Fetching Odoo cart...");
    if (!userIsSignIn || !userToken) {
      return null;
    }

    try {
      const response = await fetchData("yokohama/cart/mine", userToken);

      // Fix: Check for response.data.cart_items instead of response.cart_items
      if (response?.data?.cart_items) {
        setCartSummary(response?.data?.invoice_details);
        setInitialCart(response?.data);
        setCart(response.data); // Store response.data instead of the whole response
        setHasOdooCart(true);
        return response.data;
      }

      return null;
    } catch (error) {
      console.error("Error fetching Odoo cart:", error);
      return null;
    }
  };

  /**
   * Load cart from localStorage
   */
  const loadCartFromStorage = () => {
    try {
      const email = userData?.email || "guest";
      const key = `${CART_STORAGE_KEY}_${email}`;
      const storedData = localStorage.getItem(key);

      if (storedData) {
        const parsedData = JSON.parse(storedData);

        // Check if cart has expired
        if (parsedData.expiry && new Date() > new Date(parsedData.expiry)) {
          localStorage.removeItem(key);
          setCart([]);
        } else {
          setCart(parsedData.items || []);
        }
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error loading cart from storage:", error);
      setCart([]);
    }
  };

  /**
   * Save cart to localStorage with expiry date
   */
  const saveCartToStorage = (cartItems) => {
    try {
      const email = userData?.email || "guest";
      const key = `${CART_STORAGE_KEY}_${email}`;

      // Set expiry date (current date + expiry days)
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + CART_EXPIRY_DAYS);

      const dataToStore = {
        items: cartItems,
        expiry: expiry.toISOString(),
      };

      localStorage.setItem(key, JSON.stringify(dataToStore));
    } catch (error) {
      console.error("Error saving cart to storage:", error);
    }
  };

  /**
   * Add product to cart (either Odoo or localStorage)
   */
  const addToCart = async (product, quantity = 1) => {
    setIsAddingToCart(true);
    setLoadingItems((prev) => ({ ...prev, [product.id]: true }));
    try {
      if (hasOdooCart) {
        // Add to Odoo cart
        await addToOdooCart(product.id, quantity);
        await fetchOdooCart(); // Refresh cart data
      } else {
        // Add to localStorage
        const updatedCart = [...cart];
        const existingItemIndex = updatedCart.findIndex(
          (item) => item.id === product.id || item.product_id === product.id
        );

        if (existingItemIndex >= 0) {
          updatedCart[existingItemIndex].quantity += quantity;
        } else {
          updatedCart.push({
            id: product.id,
            product_id: product.id,
            name: product.name,
            quantity: quantity,
            price: product.retail_price || product.price,
            currency: product.currency,
            images: product.images,
          });
        }

        setCart(updatedCart);
        saveCartToStorage(updatedCart);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Show error message to user
    } finally {
      setIsAddingToCart(false);
      setLoadingItems((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  /**
   * Add product to Odoo cart via API
   */
  const addToOdooCart = async (productId, quantity = 1) => {
    if (!userIsSignIn || !userToken) {
      return false;
    }

    try {
      // Format a single product using the proper structure with actual productId and quantity
      const formattedProducts = [
        {
          product_id: productId,
          qty: quantity,
        },
      ];
      console.log({ products: formattedProducts });

      const response = await postDataJson(
        "yokohama/cart/add-multiple",
        { products: formattedProducts },
        userToken
      );

      console.log(response);

      if (response) {
        setHasOdooCart(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error adding to Odoo cart:", error);
      return false;
    }
  };

  /**
   * Add multiple products to Odoo cart via API in one request
   */
  const addMultipleToOdooCart = async (products) => {
    if (!userIsSignIn || !userToken) {
      return false;
    }

    try {
      // Format products into the required structure
      const formattedProducts = products.map((product) => ({
        product_id: product.id || product.product_id,
        qty: product.quantity,
      }));

      const response = await postDataJson(
        "yokohama/cart/add-multiple",
        { products: formattedProducts },
        userToken
      );

      if (response) {
        setHasOdooCart(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error adding multiple products to Odoo cart:", error);
      return false;
    }
  };

  /**
   * Transfer localStorage cart to Odoo (for Cash on Delivery or Pay Now flows)
   */
  const transferCartToOdoo = async () => {
    if (!userIsSignIn || !userToken || cart.length === 0) {
      return false;
    }

    setIsLoading(true);

    try {
      // Format all local cart items for the bulk add endpoint
      const products = cart.map((item) => ({
        product_id: item.id || item.product_id,
        qty: item.quantity,
      }));

      // Add all products in a single request
      const success = await addMultipleToOdooCart(products);

      if (success) {
        // Clear localStorage cart after successful transfer
        clearLocalStorageCart();

        // Fetch updated Odoo cart
        await fetchOdooCart();

        setHasOdooCart(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error transferring cart to Odoo:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update product quantity in cart
   */
  const updateQuantity = async (productId, newQuantity) => {
    setLoadingItems((prev) => ({ ...prev, [productId]: true }));

    console.log("Updating quantity for product:", productId, "to", newQuantity);

    try {
      if (hasOdooCart) {
        // Update in Odoo cart using GET with body
        // Use product_id instead of id
        const response = await postDataForm(
          `yokohama/cart/update/${productId}`, // This should be the product_id
          { quantity: newQuantity },
          userToken
        );

        console.log("Odoo cart update response:", response);

        // Update cart with the returned data
        if (response?.data) {
          setCart(response.data);
        }
      } else {
        // Update in localStorage - handle both id and product_id for consistency
        const updatedCart = cart.map((item) => {
          if (item.product_id === productId || item.id === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });

        setCart(updatedCart);
        saveCartToStorage(updatedCart);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  /**
   * Remove product from cart
   */
  const removeFromCart = async (productId) => {
    setLoadingItems((prev) => ({ ...prev, [productId]: true }));

    try {
      if (hasOdooCart) {
        // Remove from Odoo cart - use product_id consistently
        await fetchDelete(`yokohama/cart/delete/${productId}`, userToken);
        await fetchOdooCart(); // Refresh cart data
      } else {
        // Remove from localStorage - check both id and product_id
        const updatedCart = cart.filter(
          (item) => item.product_id !== productId && item.id !== productId
        );

        setCart(updatedCart);
        saveCartToStorage(updatedCart);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  /**
   * Clear localStorage cart
   */
  const clearLocalStorageCart = () => {
    const email = userData?.email || "guest";
    const key = `${CART_STORAGE_KEY}_${email}`;
    localStorage.removeItem(key);
  };

  /**
   * Clear all cart data
   */
  const clearCart = () => {
    setCart([]);
    clearLocalStorageCart();
  };

  /**
   * Get cart summary (item count and subtotal)
   */
  const getCartSummary = () => {
    let cartItems = [];

    if (hasOdooCart && cart?.data?.cart_items) {
      cartItems = cart.data.cart_items;
    } else if (Array.isArray(cart)) {
      cartItems = cart;
    }

    if (cartItems.length === 0) {
      return { itemCount: 0, subtotal: "0.00" };
    }

    const itemCount = cartItems.reduce(
      (total, item) => total + (item.quantity || 0),
      0
    );

    const subtotal = cartItems.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 0),
      0
    );

    return {
      itemCount,
      subtotal: subtotal.toFixed(2),
    };
  };

  /**
   * Get cart items in a consistent format
   */
  const getCartData = () => {
    if (hasOdooCart) {
      return cart?.cart_items || [];
    }

    return Array.isArray(cart) ? cart : [];
  };

  /**
   * Handle product display for UI feedback
   */
  const displayProductHandler = (product) => {
    setDisplayProduct(product);
  };

  useEffect(() => {
    fetchOdooCart();
  }, [userIsSignIn]);

  // Context value
  const contextValue = {
    cart: getCartData(),
    hasOdooCart,
    intialCart,
    isLoading,
    isAddingToCart,
    loadingItems,

    // Cart operations
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    transferCartToOdoo,
    fetchOdooCart,

    // Cart info
    getCartSummary,
    cartSummary,

    // Product display
    displayProduct,
    displayProductHandler,
  };

  return (
    <UserCartContext.Provider value={contextValue}>
      {children}
    </UserCartContext.Provider>
  );
};
