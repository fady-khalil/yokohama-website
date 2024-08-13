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

  const scrollToSection = (id) => {
    setSelectedTabs(id);
    switch (id) {
      case 1:
        descriptionRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case 2:
        specsRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case 3:
        sizeInfoRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case 4:
        galleryRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case 5:
        warrantyRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case 6:
        reviewsRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

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

  if (isLoading) return <IsLoading />;
  if (isError || error) return <IsError />;
  if (data) {
    return (
      <main>
        <ProductInfo
          feature_ids={data?.feature_ids}
          currency={data?.currency}
          price={data?.price}
          brand={data?.brand}
          size={data?.size}
          name={data?.name}
          category={data?.category}
          product_image={data?.images}
          description={data?.description}
        />
        <ProductInfoTabs
          activeTabs={selectedTabs}
          data={data}
          onTabClick={scrollToSection}
        />
        {data?.description_sale?.title && (
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
        </div>
      </main>
    );
  }
};

export default ProductDetailed;
