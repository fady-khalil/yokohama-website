import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Filter from "./Components/Filter";
import Listing from "./Components/Listing";
import { useParams } from "react-router-dom";
import useGetData from "Hooks/Fetching/useGetData";
import IsLoading from "Components/RequestHandler/IsLoading";
import IsError from "Components/RequestHandler/IsError";

const Shop = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  // fetching data
  const { id } = useParams();
  const { fetchData, error } = useGetData();
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // filter
  const [selectedBrandID, setSelectedBrandID] = useState();
  const [selectClassificationID, setSelectClassificationID] = useState();
  const [selectCategoryId, setSelectCategoryId] = useState();

  const handleBrandId = (id) => {
    setSelectedBrandID(id);
  };
  const handleClassificationID = (id) => {
    setSelectClassificationID(id);
  };
  const handleCategoryIdID = (id) => {
    setSelectCategoryId(id);
  };

  const getData = async (classificationID, brandId, categoryId) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetchData(
        `yokohama/ctegories/all/sub_categories?id=${id}${
          classificationID ? `&class_ids=[${classificationID}]` : ""
        }${brandId ? `&brand_ids=[${brandId}]` : ""}${
          categoryId ? `&categ_ids=[${categoryId}]` : ""
        }&page=${page}`
      );
      setTotalPages(result?.totalpages);
      setData(result?.data);
      setAllData(result);
      setFilteredData(result?.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectClassificationID && selectedBrandID && selectCategoryId) {
      // Call with both classificationID and brandID
      getData(selectClassificationID, selectedBrandID, selectCategoryId);
    } else if (selectClassificationID) {
      // Call with only classificationID
      getData(selectClassificationID, null, null);
    } else if (selectedBrandID) {
      // Call with only brandID
      getData(null, selectedBrandID, null);
    } else if (selectCategoryId) {
      getData(null, null, selectCategoryId);
    } else {
      getData();
    }
  }, [id, page, selectClassificationID, selectedBrandID, selectCategoryId]);

  // price high to low
  useEffect(() => {
    let filtered = [...data];

    if (sortOrder) {
      filtered = filtered.sort((a, b) => {
        if (sortOrder === "high-to-low") {
          return b.price - a.price;
        } else if (sortOrder === "low-to-high") {
          return a.price - b.price;
        }
        return 0;
      });
    }

    setFilteredData(filtered);
  }, [sortOrder, data]);

  const onPriceHighToLowHandler = (order) => {
    setSortOrder(order);
  };

  // if (isLoading) return <IsLoading />;
  if (isError || error) return <IsError />;

  return (
    <main className="relative">
      <Header header={"Shop"} />
      <div className="grid grid-cols-1 lg:grid-cols-4 ">
        <Filter
          allData={allData}
          data={data}
          onPriceHighToLow={onPriceHighToLowHandler}
          onHandleBrandId={handleBrandId}
          onHandleClassificationID={handleClassificationID}
          onHanldeCategoryId={handleCategoryIdID}
        />

        {isLoading ? (
          <div className=" col-span-3">
            <IsLoading />
          </div>
        ) : (
          <div className="col-span-3">
            <Listing
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
              data={filteredData}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Shop;
