// GuestCartContext.js
import React, { createContext, useState, useEffect } from "react";

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

export const GuestCartContext = createContext();

export const GuestCartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = getWithExpiry("guestCart");
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const updateCart = (productId, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );

    setCart(updatedCart);
    setWithExpiry("guestCart", updatedCart, 12 * 60 * 60 * 1000); // 12 hours
  };

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      updateCart(product.id, existingItem.quantity + quantity);
    } else {
      const updatedCart = [...cart, { ...product, quantity }];
      setCart(updatedCart);
      setWithExpiry("guestCart", updatedCart, 12 * 60 * 60 * 1000);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    setWithExpiry("guestCart", updatedCart, 12 * 60 * 60 * 1000);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("guestCart");
  };

  return (
    <GuestCartContext.Provider
      value={{ cart, addToCart, updateCart, removeFromCart, clearCart }}
    >
      {children}
    </GuestCartContext.Provider>
  );
};
