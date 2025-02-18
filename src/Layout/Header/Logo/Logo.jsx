import React from "react";
import logo1 from "assests/logo/HMG-white.png";

const Logo = ({ className = "" }) => {
  return (
    <div className={className}>
      <img src={logo1} alt="HMG Logo" className="w-auto h-auto" />
    </div>
  );
  // return (
  //   <svg
  //     id="Layer_1"
  //     data-name="Layer 1"
  //     xmlns="http://www.w3.org/2000/svg"
  //     viewBox="0 0 500 73.04"
  //     style={{ width: "100%", height: "auto" }} // Adjust size as needed
  //   >
  //     <polygon
  //       fill="#e31f26"
  //       points="7.05 0.01 0.98 0 35.55 34.58 35.69 34.7 35.55 34.85 1.23 69.17 7.31 69.17 41.76 34.7 7.05 0.01"
  //     />
  //     <polygon
  //       fill="#e31f26"
  //       points="17.72 0.01 11.64 0.01 46.2 34.58 46.35 34.7 46.2 34.85 11.9 69.16 17.99 69.16 52.43 34.7 17.72 0.01"
  //     />
  //     <polygon
  //       fill="#e31f26"
  //       points="28.4 0 22.34 0.01 56.89 34.58 57.01 34.7 56.89 34.85 22.58 69.16 28.66 69.16 63.13 34.7 28.4 0"
  //     />
  //     <polygon
  //       fill="#e31f26"
  //       points="39.08 0 32.99 0 67.56 34.56 67.7 34.7 67.56 34.85 33.24 69.16 39.33 69.17 73.79 34.7 39.08 0"
  //     />
  //     <path
  //       fill="#e31f26"
  //       d="M81.55,31.52l-.14.14-.13-.14-2-2-.13-.16.13-.13L108.49,0h-6.08L76.22,26.19l-.15.15-.13-.15-2-2L73.79,24l.14-.13L97.81,0H91.73L70.89,20.86l-.14.15-.15-.15-2-2-.15-.14.15-.16L87.14,0H81.06L65.55,15.52l-.15.15-.14-.16-2-2-.14-.15.14-.13L76.45,0H70.39L60.2,10.17l-.13.14-.13-.14L49.77,0h-6.1L78.24,34.56l.12.14-.12.15L43.93,69.16H50c.13-.1,34.59-34.58,34.59-34.58L119.17,0h-6.09Z"
  //     />
  //     <polygon
  //       fill="#000"
  //       points="159.4 8.65 149.58 8.65 138.53 31.31 127.47 8.65 117.65 8.65 134.2 41.55 134.2 61.18 142.83 61.17 142.83 41.55 159.4 8.65"
  //     />
  //     <path
  //       fill="#000"
  //       d="M161,34.92a18,18,0,1,0,18-18,18,18,0,0,0-18,18M179,8.21A26.71,26.71,0,1,1,152.3,34.92,26.71,26.71,0,0,1,179,8.21"
  //     />
  //     <path
  //       fill="#000"
  //       d="M244.92,34.89a18,18,0,1,0,18-18,18,18,0,0,0-18,18m18-26.7a26.72,26.72,0,1,1-26.74,26.7,26.75,26.75,0,0,1,26.74-26.7"
  //     />
  //     <polygon
  //       fill="#000"
  //       points="244.73 8.21 233.25 8.21 217.11 30.57 217.11 8.21 207.97 8.21 207.97 60.74 217.11 60.74 217.11 39.09 232.49 60.74 243.97 60.74 224.43 34.99 244.73 8.21"
  //     />
  //     <polygon
  //       fill="#000"
  //       points="320.13 8.62 320.13 30.93 301.28 30.93 301.28 8.62 291.91 8.62 291.91 61.17 301.28 61.17 301.28 39.94 320.13 39.94 320.13 61.17 329.47 61.17 329.47 8.66 320.13 8.62"
  //     />
  //     <path
  //       fill="#000"
  //       d="M349,40.39l6.6-17.87,6.62,17.87Zm20.87,20.78h9.82L360.22,8.62h-9.34l-19.4,52.55h9.8l4.83-13.39H365Z"
  //     />
  //     <path
  //       fill="#000"
  //       d="M455.83,40.39l6.61-17.89,6.62,17.89ZM476.7,61.17h9.83L467.14,8.62h-1l-8,0h-.4L438.35,61.17h9.85L453,47.76h18.88Z"
  //     />
  //     <polygon
  //       fill="#000"
  //       points="432.97 8.62 426.08 8.62 424.1 8.66 408.62 48.91 393.13 8.62 391.13 8.66 384.28 8.62 381.58 8.66 381.58 61.17 390.97 61.17 391.13 26.83 404.23 61.17 404.64 61.17 412.56 61.17 412.97 61.17 426.09 26.83 426.25 61.17 435.66 61.17 435.66 8.62 432.97 8.62"
  //     />
  //     <path
  //       fill="#000"
  //       d="M489.94,56.3a4.74,4.74,0,1,1,4.73,4.75,4.74,4.74,0,0,1-4.73-4.75m-.6,0A5.33,5.33,0,1,0,494.67,51a5.33,5.33,0,0,0-5.33,5.32"
  //     />
  //     <path
  //       fill="#000"
  //       d="M493.32,55.94h1.44a1.65,1.65,0,0,0,.71-.12.84.84,0,0,0,.4-.37,1.14,1.14,0,0,0,.15-.56,1,1,0,0,0-.28-.75,1.14,1.14,0,0,0-.82-.26h-1.6Zm-.69,3.48V53.19h2.26a2.53,2.53,0,0,1,1.05.16,1.35,1.35,0,0,1,.55.58,2,2,0,0,1,.22,1,1.79,1.79,0,0,1-.36,1.14,1.69,1.69,0,0,1-1.07.56,1.45,1.45,0,0,1,.43.35,3.68,3.68,0,0,1,.54.79l.88,1.7h-.85l-.67-1.29a7,7,0,0,0-.6-1,1.07,1.07,0,0,0-1-.44,2.51,2.51,0,0,0-1.14.22Z"
  //     />
  //   </svg>
  // );
};

export default Logo;
