import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Filter from "./Components/Filter";
import Listing from "./Components/Listing";
import { useParams } from "react-router-dom";
import useGetData from "Hooks/Fetching/useGetData";
import IsLoading from "Components/RequestHandler/IsLoading";
import IsError from "Components/RequestHandler/IsError";
import Container from "Components/Container/Container";
import { Faders, ArrowUp } from "@phosphor-icons/react";

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
  // tire size
  const [selectedWidth, setSelectedWidth] = useState();
  const [selectedAspectRatio, setSelectedAspectRatio] = useState();
  const [selectedDiameter, setSelectedDiameter] = useState();
  // size
  const [selectedSizeName, setSelectedSizeName] = useState();

  const handleBrandId = (id) => {
    setSelectedBrandID(id);
  };
  const handleClassificationID = (id) => {
    setSelectClassificationID(id);
  };
  const handleCategoryIdID = (id) => {
    setSelectCategoryId(id);
  };
  const handleWidth = (name) => {
    setSelectedWidth(name);
  };
  const handleAspectRatio = (name) => {
    setSelectedAspectRatio(name);
  };
  const handleDiameter = (name) => {
    setSelectedDiameter(name);
  };
  const handleSizeName = (name) => {
    setSelectedSizeName(name);
  };

  const getData = async (
    classificationID,
    brandId,
    categoryId,
    width,
    aspectRatio,
    diameter,
    sizeName
  ) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const result = await fetchData(
        `yokohama/categories/subcategs/all?category_id=${id}${
          classificationID ? `&classification_id=${classificationID}` : ""
        }${brandId ? `&brand_id=${brandId}` : ""}${
          categoryId ? `&kind_id=${categoryId}` : ""
        }${width ? `&width=${width}` : ""}${
          aspectRatio ? `&aspect=${aspectRatio}` : ""
        }${diameter ? `&inch=${diameter}` : ""}${
          sizeName ? `&size=${sizeName}` : ""
        }&page=${page}`
      );

      // try {
      //   const result = await fetchData(
      //     `yokohama/ctegories/all/sub_categories?id=${id}${
      //       classificationID ? `&class_ids=${classificationID}` : ""
      //     }${brandId ? `&brand_ids=${brandId}` : ""}${
      //       categoryId ? `&categ_ids=[${categoryId}]` : ""
      //     }${width ? `&size_width=${width}` : ""}${
      //       aspectRatio ? `&size_aspects=${aspectRatio}` : ""
      //     }${diameter ? `&size_inch=${diameter}` : ""}${
      //       sizeName ? `&size_name=${sizeName}` : ""
      //     }&limit=10&page=${page}`
      //   );

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
    // Prepare parameters for the getData function
    const params = [
      selectClassificationID || null,
      selectedBrandID || null,
      selectCategoryId || null,
      selectedWidth || null,
      selectedAspectRatio || null,
      selectedDiameter || null,
      selectedSizeName || null,
    ];

    // Call getData with the parameters array
    getData(...params);
  }, [
    id,
    page,
    selectClassificationID,
    selectedBrandID,
    selectCategoryId,
    selectedWidth,
    selectedAspectRatio,
    selectedDiameter,
    selectedSizeName,
  ]);

  // price high to low
  useEffect(() => {
    let filtered = Array.isArray(data) ? [...data] : [];

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

  const clearFilters = () => {
    setSelectedBrandID(null);
    setSelectClassificationID(null);
    setSelectCategoryId(null);
    setSortOrder("");
    setSelectedWidth(null);
    setSelectedAspectRatio(null);
    setSelectedDiameter(null);
    setSelectedSizeName(null);
  };

  const [filterIsVisible, setFilterIsVisible] = useState(false);
  const onHandleFilterVisible = () => {
    setFilterIsVisible((cur) => !cur);
  };

  useEffect(() => {
    clearFilters();
  }, [id]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // if (isError || error) return <IsError />;
  return (
    <main className="relative">
      <Header header={"Shop"} />
      <Container>
        <button
          onClick={onHandleFilterVisible}
          className="my-6 lg:hidden flex items-center justify-end w-max ml-auto"
        >
          <Faders size={32} />
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-20 mb-secondary lg:my-secondary">
          <Filter
            isVisible={filterIsVisible}
            onHandleFilterVisible={onHandleFilterVisible}
            allData={allData}
            onClearFilter={clearFilters}
            onPriceHighToLow={onPriceHighToLowHandler}
            onHandleBrandId={handleBrandId}
            onHandleClassificationID={handleClassificationID}
            onHanldeCategoryId={handleCategoryIdID}
            onHandleWidth={handleWidth}
            onHandleAspectRatio={handleAspectRatio}
            onHandleDiameter={handleDiameter}
            onHandleSizeName={handleSizeName}
          />

          {isLoading ? (
            <div className="">
              <IsLoading />
            </div>
          ) : (
            <div className="col-span-3">
              {filteredData?.length === 0 ? (
                <p className="text-lg">Showing 0 Products</p>
              ) : (
                <Listing
                  totalPages={totalPages}
                  currentPage={page}
                  onPageChange={handlePageChange}
                  data={filteredData}
                />
              )}
            </div>
          )}
        </div>
      </Container>

      <button
        onClick={scrollToTop}
        className="fixed right-4 bottom-44 bg-primary rounded-full p-1 z-[10000] text-white"
      >
        <ArrowUp size={22} />
      </button>
    </main>
  );
};

export default Shop;
