import React from "react";
import geo1 from "assests/geo-1.png";
import geo2 from "assests/geo-2.png";
import geo3 from "assests/geo-3.png";
const Features = () => {
  const data = [
    {
      name: "Fuel efficency",
      icon: geo1,
    },
    {
      name: "Wet grip",
      icon: geo2,
    },
    {
      name: "external noise class",
      icon: geo1,
    },
  ];
  return (
    <div className="flex border-t border-b py-6 mt-6 items-center ">
      {data.map(({ icon, name }, index) => (
        <div className="flex-1" key={index}>
          <img className="w-1/3" src={icon} alt="" />
          <p className="mt-2 font-medium">{name}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
