import { useRef, useState, useEffect, useContext } from "react";
import product_image from "assests/logo/product-3-removebg-preview.png";
import Container from "Components/Container/Container";
import { Link } from "react-router-dom";
import { CaretRight } from "@phosphor-icons/react";
import bg from "assests/listing/header.jpg";

import { useParams } from "react-router-dom";
import useGetData from "Hooks/Fetching/useGetData";
import IsLoading from "Components/RequestHandler/IsLoading";
import IsError from "Components/RequestHandler/IsError";

const Products = () => {
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
      const result = await fetchData(`yokohama/products/brand/${id}`);
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

  if (isError || error) return <IsError />;
  if (isLoading) return <IsLoading />;
  return (
    <main className="bg-dark">
      <Container className="pt-10">
        <div
          className="relative rounded-2xl"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute w-full h-full top-0 left-0 bg-[#00000033] z-[0]"></div>
          <div className="py-mega text-4xl rb-bold text-center text-white relative z-[10]">
            <h1>Our Products</h1>
          </div>
        </div>
      </Container>

      <Container>
        <div className="my-mega flex flex-col gap-y-12">
          {data.map(
            (
              {
                images,
                classification,
                name,
                series,
                pattern,
                description,
                id,
              },
              index
            ) => (
              <div
                className="flex items-center overflow-hidden relative p-6 shadow-xl  bg-[#E8E8E8]  rounded-[33px] w-3/4 mx-auto"
                key={index}
              >
                <div className="absolute bg-primary w-[6rem] h-[200%] rotate-[45deg] top-0 left-0 -translate-y-[50%] translate-x-[1rem]"></div>
                <div className="flex-[2] relative   ">
                  <img className="w-full  h-full" src={product_image} alt="" />
                </div>
                <div className="flex-[3]">
                  <p className="font-bold text-3xl">{name}</p>
                  {/* <p
                    className="mt-2 mb-6"
                    dangerouslySetInnerHTML={{ __html: description }}
                  /> */}

                  <p className="mt-2 mb-6 w-3/4">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Cumque laborum dignissimos harum hic rerum alias totam
                    veritatis dolor error reprehenderit?
                  </p>
                  <div className="flex gap-x-8">
                    <span className="bg-[#fff] px-6 py-2 text-primary">
                      <p>{classification}</p>
                    </span>
                    <span className="bg-[#fff] px-6 py-2 text-primary">
                      <p>{series}</p>
                    </span>
                    <span className="bg-[#fff] px-6 py-2 text-primary">
                      <p>{pattern}</p>
                    </span>
                  </div>

                  <Link
                    to={`/product-detailed/${id}`}
                    className="flex items-center border gap-x-2  bg-[#7B7B7B] w-max mt-6 text-lg text-white px-6 py-2 overflow-hidden rounded-sm group transiton ease-in duration-300  hover:border-[#7B7B7B] hover:text-[#7B7B7B] hover:scale-[0.95] relative after:absolute after:bg-white after:top-0 after:left-0 after:w-full after:transition after:ease-in after:duration-300 after:h-full after:translate-x-[-100%] hover:after:translate-x-[0] after:z-[0] z-[10]"
                  >
                    <p className="transiton ease-in duration-100 relative text-white group-hover:text-[#7B7B7B] z-[1000]">
                      Learn More
                    </p>
                    <span className="relative z-[1000] transiton ease-in duration-100 group-hover:text-primary">
                      <CaretRight size={26} />
                    </span>
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      </Container>
    </main>
  );
};

export default Products;
