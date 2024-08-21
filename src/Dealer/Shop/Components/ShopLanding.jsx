import { useState, useEffect, useContext } from "react";
import Container from "Components/Container/Container";
import { Info, DotsThreeVertical } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Spinner from "Components/RequestHandler/Spinner";

// fetcing data
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import IsLoading from "Components/RequestHandler/IsLoading";
import IsError from "Components/RequestHandler/IsError";

// context
import { DealerLoginContext } from "context/Auth/DealerContext";
import { DealerCartContext } from "context/DealerCart/DealerCartContext";
const ShopLanding = ({ selectedId }) => {
  const { fetchData, error } = useGetDataToken();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  // context
  const { dealerToken } = useContext(DealerLoginContext);
  const {
    AddToCart,
    addToCartLoading,
    displayProductHandler,
    cart,
    updateCart,
    removeFromCart,
  } = useContext(DealerCartContext);

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetchData(
        `yokohama/ctegories/dealer/sub_categories?id=${selectedId}`,
        dealerToken
      );
      setData(result);
      // setFilteredData(result?.data || []);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      updateCart(productId, quantity);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedId]);

  const [foundProducts, setFoundProducts] = useState();

  useEffect(() => {
    if (cart?.cart_items) {
      const foundItems = data?.data?.flatMap((item) =>
        item.products?.filter((product) =>
          cart?.cart_items?.some(
            (cartItem) => cartItem.product_id === product.id
          )
        )
      );

      // Do something with the foundItems, such as setting state
      if (foundItems?.length > 0) {
        setIsInCart(true);
        setFoundProducts(foundItems); // Store the found products
      } else {
        setIsInCart(false);
        setFoundProducts([]); // No matching products found
      }
    }
  }, [cart, data]);

  const getCartItemQuantity = (productId) => {
    const cartItem = cart?.cart_items?.find(
      (item) => item.product_id === productId
    );
    return cartItem ? cartItem.quantity : 0;
  };
  return (
    <div className="mb-primary">
      <Container>
        <div className="flex items-center justify-end gap-x-6 my-8">
          <span className="flex items-center gap-x-3 ">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>

            <p>available</p>
          </span>
          <span className="flex items-center gap-x-3">
            <span className="w-3 h-3 bg-primary rounded-full"></span>
            <p>Not available</p>
          </span>
        </div>
        <div className="overflow-scroll xl:overflow-hidden">
          {isLoading ? (
            <div className="flex w-max justify-center mx-auto  flex-col items-center">
              <Spinner />
              <p className="mt-3">Loading data...</p>
            </div>
          ) : (
            <table className="w-full ">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                    <span className="flex items-center justify-center ">
                      <DotsThreeVertical size={32} />
                      <p>Tire Size</p>
                    </span>
                  </th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                    <span className="flex items-center justify-center ">
                      <DotsThreeVertical size={32} />
                      <p>Brand</p>
                    </span>
                  </th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                    <span className="flex items-center justify-center ">
                      <DotsThreeVertical size={32} />
                      <p>Pattern</p>
                    </span>
                  </th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                    <span className="flex items-center justify-center ">
                      <DotsThreeVertical size={32} />
                      <p>Price</p>
                    </span>
                  </th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                    <span className="flex items-center justify-center ">
                      <DotsThreeVertical size={32} />
                      <p>Discount</p>
                    </span>
                  </th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                    <span className="flex items-center justify-center ">
                      <DotsThreeVertical size={32} />
                      <p>available QTY</p>
                    </span>
                  </th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                    <span className="flex items-center justify-center ">
                      <DotsThreeVertical size={32} />
                      <p>QTY</p>
                    </span>
                  </th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                    Subtotal
                  </th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm"></th>
                  <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm"></th>
                </tr>
              </thead>

              <tbody className="">
                {data?.data?.map((item, dataIndex) =>
                  item.products?.map(
                    (
                      {
                        id,
                        name,
                        price,
                        images,
                        brand,
                        pattern,
                        discount,
                        qty_available,
                      },
                      index
                    ) => {
                      const isProductInCart = foundProducts?.some(
                        (product) => product.id === id
                      );
                      const cartQuantity = getCartItemQuantity(id);

                      return (
                        <tr key={index}>
                          <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm">
                            <Link to={"/product-detailed"}>{name}</Link>
                          </td>
                          <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm">
                            <Link to={"/product-detailed"}>{brand}</Link>
                          </td>
                          <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm">
                            <Link to={"/product-detailed"}>{pattern}</Link>
                          </td>
                          <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm">
                            <Link to={"/product-detailed"}>{price} USD</Link>
                          </td>
                          <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm">
                            <p>{discount}</p>
                            {/* <p className="text-primary italic text-sm font-light">
                          {order.discount[1]}
                        </p> */}
                          </td>
                          <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm">
                            <div className="flex items-center gap-x-2 justify-center">
                              <span
                                className={`w-3 h-3 ${
                                  qty_available > 0
                                    ? "bg-green-500"
                                    : "bg-primary"
                                } rounded-full block`}
                              ></span>

                              {qty_available}
                            </div>
                          </td>
                          <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm ">
                            <span className="w-[80%] mx-auto flex items-center gap-x-4 justify-between  px-2 py-1 border">
                              <button
                                disabled={!isProductInCart}
                                onClick={() =>
                                  handleQuantityChange(id, cartQuantity + 1)
                                }
                              >
                                +
                              </button>
                              <p>{cartQuantity}</p>
                              <button
                                disabled={!isProductInCart}
                                onClick={() =>
                                  handleQuantityChange(id, cartQuantity - 1)
                                }
                              >
                                -
                              </button>
                            </span>
                          </td>
                          <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm">
                            <p>Sub Total</p>
                          </td>
                          <td
                            className={`min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm`}
                          >
                            <button
                              onClick={() => AddToCart(id)}
                              className={`px-4 py-1.5 rb-bold   text-sm text-white uppercase ${
                                isProductInCart ? "bg-primary" : "bg-black"
                              } `}
                              // disabled={addToCartLoading} // Disable the button while loading
                            >
                              {addToCartLoading[id] ? (
                                <Spinner isSmall={true} />
                              ) : isProductInCart ? (
                                "In your cart"
                              ) : (
                                "Add to cart"
                              )}
                            </button>
                          </td>
                          <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm">
                            <button className="text-white bg-primary p-1 rounded-full">
                              <Info weight="fill" />
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ShopLanding;
