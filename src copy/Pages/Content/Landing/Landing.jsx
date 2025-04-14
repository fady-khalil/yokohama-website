import React from "react";
import Container from "Components/Container/Container";
import "./style.css";
const Landing = ({ text, title }) => {
  // The base URL to prepend to image sources
  const baseURL = "https://erpxcloud-yokohamav3-dowgroup-14622520.dev.odoo.com";

  // Function to update image src attributes in the HTML string
  const updateImageSrc = (htmlContent) => {
    return htmlContent?.replace(
      /<img\s+src="(\/web\/image[^"]+)"/g,
      (match, p1) => {
        // Prepend the base URL to the image source
        return match?.replace(p1, baseURL + p1);
      }
    );
  };

  // Process the HTML text to update the image URLs
  const updatedText = updateImageSrc(text);

  return (
    <section className="my-16 w-3/4 mx-auto">
      <Container>
        <h2 className="text-5xl font-bold mb-10 relative after:absolute after:left-0 after:bg-primary after:w-[5rem] after:h-[6px] after:-bottom-3">
          {title}
        </h2>
        {/* Render the HTML content with updated image URLs */}
        <div
          className="content text-justify"
          dangerouslySetInnerHTML={{ __html: updatedText }}
        />
      </Container>
    </section>
  );
};

export default Landing;
