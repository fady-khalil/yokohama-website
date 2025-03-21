import { useState, useEffect, useContext } from "react";
import { DealerLoginContext } from "context/Auth/DealerContext";
// fetching data
import { useParams } from "react-router-dom";
import useGetData from "Hooks/Fetching/useGetData";
import IsLoading from "Components/RequestHandler/IsLoading";
import IsError from "Components/RequestHandler/IsError";
const ProductDetailed = () => {
  const { dealerToken } = useContext(DealerLoginContext);

  console.log(dealerToken);
  return <div>ProductDetailed</div>;
};

export default ProductDetailed;
