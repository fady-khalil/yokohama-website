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
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedClassification, setSelectedClassification] = useState("");
  const [categories, setCategories] = useState([]);
  const [classifications, setClassifications] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [priceRangeData, setPriceRangeData] = useState([]);
  const onPriceRangeChange = (range) => {
    setPriceRangeData(range);
  };
  // fetching data
  const { id } = useParams();
  const { fetchData, error } = useGetData();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetchData(
        `yokohama/ctegories/all/sub_categories?id=${id}&page=${page}`
      );
      setTotalPages(result?.totalpages);
      setData(result?.data || []);
      setFilteredData(result?.data || []);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id, page]);

  useEffect(() => {
    if (data) {
      const allCategories = data.flatMap((item) =>
        item?.products.flatMap((product) => product.category)
      );

      const uniqueCategories = Array.from(
        new Set(allCategories.map((cat) => JSON.stringify(cat)))
      ).map((cat) => JSON.parse(cat));

      setCategories(uniqueCategories);

      const allClassifications = data.flatMap((item) =>
        item?.products.flatMap((product) => product.classification)
      );

      const uniqueClassifications = Array.from(
        new Set(allClassifications.map((classif) => JSON.stringify(classif)))
      ).map((classif) => JSON.parse(classif));

      setClassifications(uniqueClassifications);
    }
  }, [data]);

  useEffect(() => {
    let filtered = data;

    if (filterType === "brand" && selectedBrand) {
      filtered = filtered
        .map((item) => ({
          ...item,
          products: item.products.filter(
            (product) => product.brand === selectedBrand
          ),
        }))
        .filter((item) => item.products.length > 0);
    }

    if (filterType === "category" && selectedCategory) {
      filtered = filtered
        .map((item) => ({
          ...item,
          products: item.products.filter((product) =>
            product.category.some((cat) => cat.name === selectedCategory)
          ),
        }))
        .filter((item) => item.products.length > 0);
    }

    if (filterType === "classification" && selectedClassification) {
      filtered = filtered
        .map((item) => ({
          ...item,
          products: item.products.filter(
            (product) => product.classification === selectedClassification
          ),
        }))
        .filter((item) => item.products.length > 0);
    }

    if (sortOrder) {
      filtered = filtered?.flatMap((item) => item.products);

      const data = filtered.sort((a, b) => {
        if (sortOrder === "high-to-low") {
          return b.price - a.price; // Highest to lowest
        } else if (sortOrder === "low-to-high") {
          return a.price - b.price; // Lowest to highest
        }
        return 0; // No sorting if sortOrder is neither
      });
      filtered = [{ products: data }];
    }

    setFilteredData(filtered);
  }, [
    selectedBrand,
    selectedCategory,
    selectedClassification,
    filterType,
    sortOrder,
    data,
  ]);

  const onBrandFilter = (brand) => {
    if (filterType === "brand" && selectedBrand === brand) {
      setSelectedBrand("");
      setFilterType(""); // Reset filterType when brand is cleared
    } else {
      setSelectedBrand(brand);
      setSelectedCategory(""); // Clear category and classification selection
      setSelectedClassification("");
      setFilterType("brand");
    }
  };

  const onCategoryFilter = (category) => {
    if (filterType === "category" && selectedCategory === category) {
      setSelectedCategory("");
      setFilterType(""); // Reset filterType when category is cleared
    } else {
      setSelectedCategory(category);
      setSelectedBrand(""); // Clear brand and classification selection
      setSelectedClassification("");
      setFilterType("category");
    }
  };

  const onClassificationFilter = (classification) => {
    if (
      filterType === "classification" &&
      selectedClassification === classification
    ) {
      setSelectedClassification("");
      setFilterType(""); // Reset filterType when classification is cleared
    } else {
      setSelectedClassification(classification);
      setSelectedBrand(""); // Clear brand and category selection
      setSelectedCategory("");
      setFilterType("classification");
    }
  };

  const onPriceHighToLowHandler = (order) => {
    setSortOrder(order);
  };

  if (isLoading) return <IsLoading />;
  if (isError || error) return <IsError />;
  return (
    <main className="relative">
      <Header header={"Shop"} />
      <div className="grid grid-cols-1 lg:grid-cols-4 ">
        <Filter
          onPriceRangeChange={onPriceRangeChange}
          onPriceHighToLow={onPriceHighToLowHandler}
          onBrandFilter={onBrandFilter}
          onCategoryFilter={onCategoryFilter}
          onClassificationFilter={onClassificationFilter}
          data={data}
          selectedBrand={selectedBrand}
          selectedCategory={selectedCategory}
          selectedClassification={selectedClassification}
          categories={categories}
          filterType={filterType}
          classifications={classifications}
        />
        <Listing
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
          data={filteredData}
        />
      </div>
    </main>
  );
};

export default Shop;
