import React, { useEffect, useState } from "react";
import MainButton from "Components/Buttons/MainButton";
import Container from "Components/Container/Container";
import tiresImage from "assests/tires-shop.jpg";
import batteryImage from "assests/battery-shop.jpg";
import lubriImage from "assests/lubri-shop.jpg";
import useGetData from "Hooks/Fetching/useGetData";
import Spinner from "Components/RequestHandler/Spinner";

const Shop = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { fetchData, error } = useGetData();

  // Predefined images in the required order
  const images = [tiresImage, batteryImage, lubriImage];

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetchData("yokohama/ctegories/all");
      const fetchedData = response?.data || [];

      const mergedData = fetchedData.map((item, index) => ({
        ...item,
        image: images[index] || images[images.length - 1],
      }));

      setData(mergedData);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="bg-dark pt-x pb-mega">
      <Container>
        <div className="flex flex-col xl:flex-row gap-6">
          {data?.map((item, index) => (
            <div
              className="flex-1 shop-bg py-20 lg:py-40 px-24 flex items-center justify-center"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              key={index}
            >
              <MainButton to={`/shop/${item.id}`}>
                {isLoading ? <Spinner /> : item.name}
              </MainButton>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Shop;
