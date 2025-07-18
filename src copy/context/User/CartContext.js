import React, { createContext, useState, useEffect, useContext } from "react";
import { UserLoginContext } from "context/Auth/UserLoginContext";
// fetching data
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import usePostToken from "Hooks/Fetching/usePostToken";

export const UserCartContext = createContext();

// Constants
const CART_STORAGE_KEY = "yokohama_cart";
const CART_EXPIRY_HOURS = 24; // 24 hours expiry

// Utility functions for localStorage with expiry
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

  try {
    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error);
    localStorage.removeItem(key);
    return null;
  }
};

// Cart modes
const CART_MODES = {
  LOCALSTORAGE: "localStorage", // Default mode - all items in localStorage
  ODOO_ACTIVE: "odoo_active", // After Cash on Delivery - new items go to Odoo
};

export const UserCartProvider = ({ children }) => {
  const { userToken, userIsSignIn, handleUserLogout } =
    useContext(UserLoginContext);
  const { fetchData } = useGetDataToken();
  const { postData } = usePostToken();

  // Core cart state
  const [cart, setCart] = useState([]);
  const [cartMode, setCartMode] = useState(CART_MODES.LOCALSTORAGE);

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [loadingItems, setLoadingItems] = useState({});

  // Payment states
  const [paymentRef, setPaymentRef] = useState(null);
  const [orderId, setOrderId] = useState(null);

  // Product display state
  const [displayProduct, setDisplayProduct] = useState("");

  // Load cart on mount and when user signs in
  useEffect(() => {
    const loadCartData = async () => {
      try {
        if (userIsSignIn) {
          // Always check Odoo first when user is signed in
          await checkAndSyncOdooCart();
        } else {
          // Load from localStorage for non-signed-in users
          loadCartFromStorage();
        }
      } catch (error) {
        console.error("Error loading cart:", error);
        setCart([]);
      }
    };

    loadCartData();
  }, [userIsSignIn]);

  // Handle cart mode changes
  useEffect(() => {
    const handleModeChange = async () => {
      if (cartMode === CART_MODES.ODOO_ACTIVE && userIsSignIn) {
        // Refresh Odoo cart when switching to ODOO_ACTIVE mode
        const odooCartData = await fetchOdooCart();
        setCart(odooCartData);
      }
    };

    handleModeChange();
  }, [cartMode]);

  // Load cart from localStorage
  const loadCartFromStorage = () => {
    try {
      const storedCart = getWithExpiry(CART_STORAGE_KEY);
      if (storedCart && Array.isArray(storedCart)) {
        setCart(storedCart);
        console.log(`Loaded ${storedCart.length} items from localStorage`);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error loading cart from storage:", error);
      setCart([]);
    }
  };

  // Save cart to localStorage
  const saveCartToStorage = (cartItems) => {
    try {
      const ttl = CART_EXPIRY_HOURS * 60 * 60 * 1000; // Convert hours to milliseconds
      setWithExpiry(CART_STORAGE_KEY, cartItems, ttl);
      console.log(`Saved ${cartItems.length} items to localStorage`);
    } catch (error) {
      console.error("Error saving cart to storage:", error);
    }
  };

  // Fetch cart from Odoo
  const fetchOdooCart = async () => {
    try {
      if (!userIsSignIn || !userToken) {
        console.log("User not signed in, cannot fetch Odoo cart");
        return [];
      }

      setIsLoading(true);
      console.log("Fetching cart from Odoo...");

      const response = await fetchData("yokohama/cart/mine", userToken);
      console.log("Odoo cart response:", response);

      // Check for invalid token
      if (response?.message === "Invalid token") {
        console.warn("Token invalid, logging out user");
        handleUserLogout();
        return [];
      }

      // Check if response has cart data
      if (response?.is_success && response?.data?.cart_items) {
        const odooCartItems = response.data.cart_items.map((item) => ({
          id: item.product_id || item.id,
          product_id: item.product_id || item.id,
          name: item.name || item.product_name,
          price: item.price || item.unit_price,
          retail_price: item.retail_price || item.unit_price,
          currency: item.currency || "$",
          image: item.image || item.product_image,
          quantity: item.quantity || 1,
          description: item.description,
          category: item.category,
          brand: item.brand,
        }));

        // Return the complete cart object structure
        const cartObject = {
          cart_items: odooCartItems,
          cart_id: response.data.cart_id || response.data.id,
          invoice_details: response.data.invoice_details || [],
        };

        console.log(`✅ Fetched ${odooCartItems.length} items from Odoo cart`);
        return cartObject;
      } else {
        console.log("No cart items found in Odoo");
        return [];
      }
    } catch (error) {
      console.error("Error fetching Odoo cart:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has active Odoo cart and switch mode if needed
  const checkAndSyncOdooCart = async () => {
    try {
      if (!userIsSignIn || !userToken) {
        console.log("User not signed in, cannot check Odoo cart");
        return;
      }

      console.log("Checking for active Odoo cart...");
      const odooCartData = await fetchOdooCart();
      console.log("Odoo cart data:", odooCartData);

      // Handle both array (empty) and object (with items) responses
      const hasItems = Array.isArray(odooCartData)
        ? odooCartData.length > 0
        : odooCartData?.cart_items?.length > 0;

      if (hasItems) {
        const itemCount = Array.isArray(odooCartData)
          ? odooCartData.length
          : odooCartData.cart_items.length;

        console.log(
          `Found ${itemCount} items in Odoo cart - switching to ODOO_ACTIVE mode`
        );
        setCartMode(CART_MODES.ODOO_ACTIVE);
        setCart(odooCartData);

        // Clear localStorage cart since we're now using Odoo
        localStorage.removeItem(CART_STORAGE_KEY);
      } else {
        console.log("No active Odoo cart found - using localStorage mode");
        // Only load localStorage if no Odoo cart exists
        if (cartMode !== CART_MODES.ODOO_ACTIVE) {
          loadCartFromStorage();
        }
      }
    } catch (error) {
      console.error("Error checking Odoo cart:", error);
    }
  };

  // Universal add to cart function
  const addToCart = async (product, quantity = 1) => {
    try {
      setIsAddingToCart(true);

      // In ODOO_ACTIVE mode, add directly to Odoo
      if (cartMode === CART_MODES.ODOO_ACTIVE && userIsSignIn) {
        const success = await addToOdooCart(product.id, quantity);
        if (success) {
          // Refresh cart display after adding to Odoo
          const updatedCart = await fetchOdooCart();
          setCart(updatedCart);
        }
        return success;
      }

      // Default: Add to localStorage (works for both signed-in and non-signed-in users)
      const cartItems = Array.isArray(cart) ? cart : cart?.cart_items || [];
      const existingItemIndex = cartItems.findIndex(
        (item) => item.id === product.id || item.product_id === product.id
      );

      let updatedCartItems;

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity:
            (updatedCartItems[existingItemIndex].quantity || 0) + quantity,
        };
      } else {
        // Add new item - be careful not to override our quantity with product.quantity object
        const cartItem = {
          id: product.id,
          product_id: product.id,
          name: product.name,
          price: product.retail_price || product.price,
          retail_price: product.retail_price || product.price,
          currency: product.currency || "$",
          image: product.image,
          // Store the simple quantity number, not the complex product.quantity object
          quantity: quantity,
          // Include other useful product properties, but exclude complex quantity object
          description: product.description,
          category: product.category,
          brand: product.brand,
          // Store original quantity info separately if needed for stock validation
          stock_info: product.quantity,
        };
        updatedCartItems = [...cartItems, cartItem];
      }

      // Update cart based on current format
      if (Array.isArray(cart)) {
        setCart(updatedCartItems);
        saveCartToStorage(updatedCartItems);
      } else {
        setCart({ ...cart, cart_items: updatedCartItems });
      }

      console.log(`✅ Added ${product.name} to cart (localStorage)`);
      return true;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return false;
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Add to Odoo cart (used for checkout flows and ODOO_ACTIVE mode)
  const addToOdooCart = async (productId, quantity = 1) => {
    try {
      if (!userIsSignIn || !userToken) {
        console.error("User not signed in, cannot add to Odoo cart");
        return false;
      }

      const response = await postData(`yokohama/cart/${productId}`, userToken);
      console.log("Odoo cart response:", response);

      // Check for invalid token
      if (response?.message === "Invalid token") {
        console.warn("Token invalid, logging out user");
        handleUserLogout();
        return false;
      }

      const isSuccess = response?.is_success === true;

      if (isSuccess) {
        console.log(`✅ Added product ${productId} to Odoo cart`);
      } else {
        console.warn("Failed to add to Odoo cart:", response);
      }

      return isSuccess;
    } catch (error) {
      console.error("Error adding to Odoo cart:", error);
      return false;
    }
  };

  // Transfer all localStorage items to Odoo
  const transferCartToOdoo = async () => {
    try {
      if (!userIsSignIn || !userToken) {
        throw new Error("User not signed in");
      }

      const cartItems = Array.isArray(cart) ? cart : cart?.cart_items || [];

      if (cartItems.length === 0) {
        console.log("No items to transfer to Odoo");
        return { success: true, transferredCount: 0 };
      }

      console.log(`Starting transfer of ${cartItems.length} items to Odoo`);

      let successCount = 0;
      let failedProducts = [];

      for (const item of cartItems) {
        const productId = item.id || item.product_id;
        const quantity = item.quantity || 1;

        console.log(
          `Transferring product ${productId} (${item.name}) with quantity ${quantity}`
        );

        const success = await addToOdooCart(productId, quantity);

        if (success) {
          successCount++;
        } else {
          failedProducts.push({
            id: productId,
            name: item.name || "Unknown product",
          });
        }
      }

      console.log(
        `Transfer completed: ${successCount}/${cartItems.length} items successful`
      );

      if (failedProducts.length > 0) {
        console.warn("Failed to transfer:", failedProducts);
      }

      return {
        success: successCount > 0,
        transferredCount: successCount,
        failedProducts: failedProducts,
      };
    } catch (error) {
      console.error("Error transferring cart to Odoo:", error);
      return { success: false, transferredCount: 0, failedProducts: [] };
    }
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    try {
      if (quantity < 1) {
        removeFromCart(productId);
        return;
      }

      if (Array.isArray(cart)) {
        // Handle localStorage array format
        const updatedCart = cart.map((item) =>
          item.id === productId || item.product_id === productId
            ? { ...item, quantity }
            : item
        );

        setCart(updatedCart);
        saveCartToStorage(updatedCart);
      } else {
        // Handle Odoo object format
        const updatedCartItems = cart.cart_items.map((item) =>
          item.id === productId || item.product_id === productId
            ? { ...item, quantity }
            : item
        );

        setCart({ ...cart, cart_items: updatedCartItems });
      }

      console.log(`Updated product ${productId} quantity to ${quantity}`);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    try {
      setLoadingItems((prev) => ({ ...prev, [productId]: true }));

      if (Array.isArray(cart)) {
        // Handle localStorage array format
        const updatedCart = cart.filter(
          (item) => item.id !== productId && item.product_id !== productId
        );

        setCart(updatedCart);
        saveCartToStorage(updatedCart);
      } else {
        // Handle Odoo object format
        const updatedCartItems = cart.cart_items.filter(
          (item) => item.id !== productId && item.product_id !== productId
        );

        setCart({ ...cart, cart_items: updatedCartItems });
      }

      console.log(`Removed product ${productId} from cart`);
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
    console.log("Cart cleared");
  };

  // Get cart summary
  const getCartSummary = () => {
    // Handle both localStorage array format and Odoo object format
    const cartItems = Array.isArray(cart) ? cart : cart?.cart_items || [];

    if (cartItems.length === 0) {
      return { itemCount: 0, subtotal: 0 };
    }

    const itemCount = cartItems.reduce((total, item) => {
      // Handle both simple numbers and complex quantity objects
      const quantity =
        typeof item.quantity === "object"
          ? item.quantity?.free_quantity || 0
          : item.quantity || 0;
      return total + quantity;
    }, 0);

    const subtotal = cartItems.reduce((total, item) => {
      const price = Number(item.retail_price || item.price || 0);
      // Handle both simple numbers and complex quantity objects
      const quantity =
        typeof item.quantity === "object"
          ? item.quantity?.free_quantity || 0
          : item.quantity || 0;
      return total + price * quantity;
    }, 0);

    return {
      itemCount,
      subtotal: subtotal.toFixed(2),
      // VAT will be calculated on server side after transfer
    };
  };

  // Get cart data in the format expected by components
  const getCartData = () => {
    // If we're in ODOO_ACTIVE mode and cart is already an object, return cart_items array
    if (
      cartMode === CART_MODES.ODOO_ACTIVE &&
      cart &&
      typeof cart === "object" &&
      !Array.isArray(cart)
    ) {
      // Return the cart_items array but add the additional properties as non-enumerable
      const cartItems = cart.cart_items || [];

      // Add cart metadata as non-enumerable properties
      Object.defineProperty(cartItems, "cart_id", {
        value: cart.cart_id,
        writable: false,
        enumerable: false,
        configurable: true,
      });

      Object.defineProperty(cartItems, "invoice_details", {
        value: cart.invoice_details,
        writable: false,
        enumerable: false,
        configurable: true,
      });

      return cartItems;
    }

    // Otherwise, return cart as array (localStorage mode)
    return Array.isArray(cart) ? cart : [];
  };

  // Set cart mode (used after Cash on Delivery)
  const setCartModeToOdoo = () => {
    setCartMode(CART_MODES.ODOO_ACTIVE);
    console.log(
      "Cart mode set to ODOO_ACTIVE - new items will go directly to Odoo"
    );
  };

  // Reset cart mode to localStorage (used for new sessions)
  const resetCartMode = () => {
    setCartMode(CART_MODES.LOCALSTORAGE);
    console.log("Cart mode reset to localStorage");
  };

  // Display product handler
  const displayProductHandler = (product) => {
    setDisplayProduct(product);
  };

  // Context value
  const contextValue = {
    // Cart data
    cart: getCartData(),
    setCart,
    cartMode,
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
    checkAndSyncOdooCart,

    // Cart info
    getCartSummary,

    // Cart modes
    setCartModeToOdoo,
    resetCartMode,

    // Payment states
    paymentRef,
    setPaymentRef,
    orderId,
    setOrderId,

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
