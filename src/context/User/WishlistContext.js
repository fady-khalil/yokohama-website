import React, { createContext, useState, useEffect, useContext } from "react";
import { UserLoginContext } from "context/Auth/UserLoginContext";
// fetching data
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import usePostToken from "Hooks/Fetching/usePostToken";

export const UserWishlistContext = createContext();

export const UserWishlistProvider = ({ children }) => {
  const { userToken, userIsSignIn } = useContext(UserLoginContext);

  // fetcing
  const { error, fetchData } = useGetDataToken();
  const { error: postAddToWishlistError, postData } = usePostToken();

  const [wishlist, setwishlist] = useState([]);
  const [wishlistIsLoading, setWishlistsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // add to cart
  const [addTowishlistLoading, setAddTowishlistLoading] = useState(false);

  // detel item from car
  const [loadingItems, setLoadingItems] = useState({});

  const getWishlistData = async () => {
    try {
      setWishlistsLoading(true);
      const cartData = await fetchData("wishlist/mine", userToken);
      setwishlist(cartData?.data);
      console.log(cartData);
    } catch (error) {
      setIsError(true);
    } finally {
      setWishlistsLoading(false);
    }
  };

  const userAddToWihlist = async (productId) => {
    try {
      setAddTowishlistLoading(true);
      const addToWishlistData = await postData(
        `wishlist/${productId}`,
        userToken
      );

      if (addToWishlistData?.is_success) {
        getWishlistData();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAddTowishlistLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      setLoadingItems((prev) => ({ ...prev, [productId]: true }));
      const deletItemData = await fetchData(
        `wishlist/delete/${productId}`,
        userToken
      );
      console.log(deletItemData);
      if (deletItemData?.is_success) {
        getWishlistData();
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  useEffect(() => {
    if (userIsSignIn) {
      getWishlistData();
    }
  }, [userIsSignIn]);

  return (
    <UserWishlistContext.Provider
      value={{
        getWishlistData,
        userAddToWihlist,
        addTowishlistLoading,
        wishlist,
        wishlistIsLoading,
        removeFromWishlist,
        loadingItems,
      }}
    >
      {children}
    </UserWishlistContext.Provider>
  );
};
