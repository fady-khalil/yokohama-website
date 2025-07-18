import React, { useContext } from "react";
import { UserCartContext } from "context/User/CartContext";
import Spinner from "Components/RequestHandler/Spinner";

const CartItem = ({ product }) => {
  const { updateQuantity, removeFromCart, loadingItems } =
    useContext(UserCartContext);

  return (
    <div className="flex flex-col gap-y-4 lg:flex-row lg:items-center lg:justify-between border-b py-4">
      <div className="flex items-center gap-4">
        <img
          src={product.images}
          alt={product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <div className="font-medium">{product.name}</div>
          <div className="text-gray-500">
            {product.price} {product.currency}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            updateQuantity(
              product.product_id,
              Math.max(1, product.quantity - 1)
            )
          }
          disabled={loadingItems[product.id || product.product_id]}
          className="px-2 py-1 border rounded"
        >
          -
        </button>
        <span>
          {loadingItems[product.id || product.product_id] ? (
            <Spinner size="small" />
          ) : (
            product.quantity
          )}
        </span>
        <button
          onClick={() =>
            updateQuantity(product.product_id, product.quantity + 1)
          }
          disabled={loadingItems[product.id || product.product_id]}
          className="px-2 py-1 border rounded"
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(product.product_id)}
          disabled={loadingItems[product.id || product.product_id]}
          className="ml-4 px-2 py-1 text-red-600 border rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
