import React from "react";
import { DealerLoginContext } from "context/Auth/DealerContext";
import { useContext } from "react";
import Container from "Components/Container/Container";
import darkLogo from "assests/logo/marwan-2-logo.jpg";

const WelcomePage = () => {
  const { allDealerData, handleDealerUser, handleDealderLogout } =
    useContext(DealerLoginContext);
  return (
    <div className="mb-primary">
      <Container>
        <img className="w-60 my-16 mx-auto" src={darkLogo} alt="" />

        <button onClick={handleDealderLogout}>New Update to tets</button>

        <div className="mb-16">
          <p className="text-2xl font-bold mb-6">Parent Company</p>
          <div className="bg-primary shadow-2xl text-white p-8 rounded-md w-max">
            <span className="flex text-lg items-center gap-2">
              <p className="font-bold">Parent Company Name :</p>
              <p>{allDealerData?.user?.username}</p>
            </span>
            <span className="flex text-lg items-center gap-2">
              <p className="font-bold">Dealer phone :</p>
              <p>{allDealerData?.user?.phone}</p>
            </span>
            <span className="flex text-lg items-center gap-2">
              <p className="font-bold">Dealer account :</p>
              <p>{allDealerData?.user?.email}</p>
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Dealers</h2>
          <div className="grid grid-cols-3 gap-x-4 gap-y-12">
            {allDealerData?.dealers
              ?.flatMap((item) =>
                Array(10)
                  .fill()
                  .map((_, index) => ({ ...item, id: `${item.id}-${index}` }))
              )
              ?.map((item) => (
                <button
                  onClick={() => handleDealerUser(item)}
                  className="border border-primary shadow-2xl text-black p-8 rounded-md hover:scale-[0.99] hover:bg-gray-100 transition-all duration-300"
                  key={item.id}
                >
                  <span className="flex text-lg items-center gap-2">
                    <p className="font-bold">Dealer Name :</p>
                    <p>{item.username}</p>
                  </span>
                  <span className="flex text-lg items-center gap-2">
                    <p className="font-bold">Dealer phone :</p>
                    <p>{item.phone}</p>
                  </span>
                  <span className="flex text-lg items-center gap-2">
                    <p className="font-bold">Dealer account :</p>
                    <p>{item.email}</p>
                  </span>
                </button>
              ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WelcomePage;
