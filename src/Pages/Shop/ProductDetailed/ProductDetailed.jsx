import { useRef, useState, useEffect, useContext } from "react";
import { UserLoginContext } from "context/Auth/UserLoginContext";
// components
import ProductInfo from "./Components/ProductInfo";
import ProductInfoTabs from "./Components/ProductInfoTabs";
import ProductDescription from "./Components/ProductDescription";
import ProductSpecs from "./Components/ProductSpecs";
import SizeInfo from "./Components/SizeInfo";
import ProductGallery from "./Components/ProductGallery";
import ProductWarranty from "./Components/ProductWarranty";
import ProductReview from "./Components/Reviews/ProductReview";

// fetching data
import { useParams } from "react-router-dom";
import useGetData from "Hooks/Fetching/useGetData";
import IsLoading from "Components/RequestHandler/IsLoading";
import IsError from "Components/RequestHandler/IsError";

const ProductDetailed = () => {
  const { userIsSignIn } = useContext(UserLoginContext);

  const [selectedTabs, setSelectedTabs] = useState(1);
  const descriptionRef = useRef(null);
  const specsRef = useRef(null);
  const sizeInfoRef = useRef(null);
  const galleryRef = useRef(null);
  const warrantyRef = useRef(null);
  const reviewsRef = useRef(null);

  // fetching
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { fetchData, error } = useGetData();

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetchData(`yokohama/products/${id}`);
      setData(result?.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  console.log(data);

  if (isLoading) return <IsLoading />;
  if (isError || error) return <IsError />;
  if (data) {
    return (
      <main>
        <ProductInfo product={data} />
        {/* <ProductInfoTabs
          activeTabs={selectedTabs}
          data={data}
          onTabClick={scrollToSection}
        /> */}
        {/* {data?.description_sale?.title && (
          <div ref={descriptionRef}>
            <ProductDescription data={data?.description_sale} />
          </div>
        )}
        {data?.specs?.title && (
          <div ref={specsRef}>
            <ProductSpecs data={data?.specs} />
          </div>
        )}
        {data?.size_info?.length > 0 && (
          <div ref={sizeInfoRef}>
            <SizeInfo data={data?.size_info} />
          </div>
        )}
        <div ref={galleryRef}>
          <ProductGallery />
        </div>
        {data?.warranty && (
          <div ref={warrantyRef}>
            <ProductWarranty name={data?.name} data={data?.warranty} />
          </div>
        )}
        <div ref={reviewsRef}>
          <ProductReview product_id={data?.id} isSignIn={userIsSignIn} />
        </div> */}
      </main>
    );
  }
};

export default ProductDetailed;
