import React from "react";
import Container from "Components/Container/Container";
const Content = ({ data }) => {
  return (
    <section>
      <Container>
        {data?.map(
          ({ content_image_path, content_title, content_Text }, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row gap-x-16 items-center lg:even:flex-row-reverse mb-14"
            >
              <div className="flex-1">
                <img className="w-full" src={content_image_path} alt="" />
              </div>
              <div className="flex-1">
                <p className="rb-bold text-4xl mt-2">{content_title}</p>
                <div
                  className="mt-4"
                  dangerouslySetInnerHTML={{ __html: content_Text }}
                />
              </div>
            </div>
          )
        )}
      </Container>
    </section>
  );
};

export default Content;
