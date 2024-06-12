import { useState } from "react";
import Container from "Components/Container/Container";
import bgImage from "assests/about-us.jpg";
import giftData from "Constant/giftData";
import MainButton from "Components/Buttons/MainButton";
import Modal from "Components/Modal/Modal";
import { X } from "@phosphor-icons/react";
import image2 from "assests/about/mission/m2.jpg";

const Gift = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const handleOpenModal = () => {
    setModalIsVisible(true);
  };
  const handleCloseModal = () => {
    setModalIsVisible(false);
  };
  return (
    <main>
      <div
        className="about-bg relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[#00000070] z-[1]"></div>

        <Container>
          <div className="py-44 relative z-[10]">
            <p className="text-4xl uppercase rb-bold text-white text-center">
              You have 100 points to redeem
            </p>
          </div>
        </Container>
      </div>
      <Container>
        {/* hedaer */}

        {/* bodt */}
        <div className="grid grid-cols-4 gap-x-6 gap-y-24 my-secondary">
          {giftData.map(({ id, image, point, text }, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center"
            >
              <div>
                <img src={image} alt="" />
              </div>
              <div className="my-3">
                <p className="rb-bold text-lg uppercase">{text}</p>
                <p className="rb-bold text-lg text-primary uppercase">
                  {point} points
                </p>
              </div>
              <MainButton onClick={handleOpenModal} isSmall={true}>
                Request
              </MainButton>
            </div>
          ))}
        </div>
      </Container>

      <Modal onHandleClose={handleCloseModal} isActive={modalIsVisible}>
        <div className="p-6">
          <div className="flex items-center justify-between text-lg rb-bold pb-2 mb-4 border-b">
            <p>Are You sure you want to request this gift?</p>
            <button onClick={handleCloseModal}>
              <X />
            </button>
          </div>
          <div className="flex  gap-x-4">
            <div className="w-[16rem] h-full ">
              <img className="h-full w-full" src={image2} alt="" />
            </div>
            <div className="w-[16rem] flex flex-col justify-center ">
              <div className="flex flex-col justify-center h-full">
                <p className="capitalize rb-bold">
                  set of 30 geolandar - AT/G016
                </p>
                <p className="capitalize text-primary rb-bold">200 Points</p>
              </div>
              <div className="mt-auto mb-2">
                <MainButton isSmall={true}>Request</MainButton>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default Gift;
