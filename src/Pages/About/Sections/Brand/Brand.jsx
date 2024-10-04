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
const Brand = ({ hero, statics, story, content }) => {
  return (
    <section>
      <Hero data={hero} />
      <Feature data={statics} />
      <div
        className="brand-bg py-mega "
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Celebrating data={story} />
        <Brands noSpace={true} />
      </div>
      <OurClients data={aboutData.brand.ourClients} />
      <Content data={content} />
    </section>
  );
};

export default Brand;
