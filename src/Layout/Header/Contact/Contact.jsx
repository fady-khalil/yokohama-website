import React from "react";
import { Phone } from "@phosphor-icons/react";
const Contact = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Phone color="#555" weight="bold" size={22} />
      <a href="">+1 (650) 555-0111</a>
    </div>
  );
};

export default Contact;
