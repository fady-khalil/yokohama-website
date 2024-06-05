import React from "react";
import aboutData from "Constant/About";
import bg from "assests/about/Brand/bg3.jpg";
// inner
import Hero from "./Sections/Hero";
import Feature from "./Sections/Feature";
import Celebrating from "./Sections/Celebrating";
import Brands from "Pages/Home/Sections/Brands/Brands";
import OurClients from "./Sections/OurClients";
import Content from "./Sections/Content";
const Brand = () => {
  return (
    <section>
      <Hero data={aboutData.brand.hero} />
      <Feature data={aboutData.brand.feature} />
      <div
        className="brand-bg py-mega "
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Celebrating data={aboutData.brand.Celebrating} />
        <Brands noSpace={true} />
      </div>
      <OurClients data={aboutData.brand.ourClients} />
      <Content data={aboutData.brand.content} />
    </section>
  );
};

export default Brand;
