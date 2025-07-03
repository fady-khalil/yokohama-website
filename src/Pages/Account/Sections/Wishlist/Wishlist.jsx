import Container from "Components/Container/Container";
import React, { useState, useContext, useEffect } from "react";
import Spinner from "Components/RequestHandler/Spinner";
import { UserWishlistContext } from "context/User/WishlistContext";
import { UserCartContext } from "context/User/CartContext";
import { Link } from "react-router-dom";

import EmptyCart from "Components/Screens/EmptyCart";
import { Trash } from "@phosphor-icons/react";

const Wishlist = () => {
  const {
    getWishlistData,
    userAddToWihlist,
    addTowishlistLoading,
    wishlist,
    wishlistIsLoading,
    removeFromWishlist,
    loadingItems,
  } = useContext(UserWishlistContext);

  const { addToCart, isAddingToCart } = useContext(UserCartContext);

  // Track loading state for individual products
  const [loadingProduct, setLoadingProduct] = useState({});

  const handleAddToCart = async (product) => {
    setLoadingProduct((prev) => ({ ...prev, [product.id]: true }));
    try {
      await addToCart(product); // Add product to the cart
      removeFromWishlist(product.id); // Remove product from the wishlist
    } catch (error) {
      console.error("Failed to add item to cart", error);
    } finally {
      setLoadingProduct((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  return (
    <div className="w-3/4 mx-auto min-h-[50vh]">
      <Container>
        {wishlistIsLoading ? (
          <div className="flex flex-col items-center ">
            <Spinner />
            <p className="mt-2">Loading Data...</p>
          </div>
        ) : wishlist?.wishlist?.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-[2] flex flex-col gap-y-3">
              {wishlist?.wishlist?.map((product, index) => (
                <div
                  className="flex flex-wrap gap-6 items-center justify-between w-full border-b pb-3"
                  key={index}
                >
                  <img className="w-28" src={product.image} alt="" />
                  <Link to={`/product-detailed/${product.id}`}>
                    <p className="min-w-[fit-content] font-medium">
                      {product.name}
                    </p>
                    <span className="mt-2 flex items-center gap-x-2">
                      <p>{product.price}</p>
                      <p>{product.currency}</p>
                    </span>
                  </Link>

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="flex items-center justify-center"
                  >
                    {loadingItems[product.id] ? (
                      <Spinner />
                    ) : (
                      <Trash weight="fill" size={26} />
                    )}
                  </button>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="border border-primary py-2 px-6"
                  >
                    {loadingProduct[product.id] ? (
                      <Spinner />
                    ) : (
                      "Add Item To Cart"
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </div>
  );
};

export default Wishlist;
