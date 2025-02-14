import React from "react";

const Modal = ({ children, isActive, onHandleClose, bigModal }) => {
  return (
    <>
      <div
        onClick={onHandleClose}
        className={`fixed w-[100vw] h-[100vh] transition ease-in duration-300 ${
          isActive
            ? "visible opacity-1 select-auto scale-1"
            : "opacity-0 select-none invisible"
        } top-0 left-0 bg-[#000000c0] z-[1000]`}
      ></div>
      <div
        className={`fixed top-1/2 left-1/2 transition ease-in duration-300   overflow-y-auto ${
          isActive
            ? "visible opacity-1 select-auto scale-1"
            : "opacity-0 select-none invisible scale-[0.4]"
        } -translate-x-1/2 -translate-y-1/2 h-auto ${
          bigModal ? "w-[75vw]" : "w-auto"
        }  max-h-[80vh] bg-white z-[10000000]`}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
