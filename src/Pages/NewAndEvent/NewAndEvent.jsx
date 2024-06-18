import React from "react";
import newsAndEvent from "Constant/newsAndEvent";
import Container from "Components/Container/Container";
const NewAndEvent = () => {
  return (
    <main className="my-secondary lg:my-primary">
      <Container>
        <div className="my-secondary">
          <h1 className="text-center text-3xl rb-bold">News And Events</h1>
        </div>
        <div className="grid grid-col-1 md:grid-cols-2 gap-6 relative">
          {newsAndEvent.map(({ title, image, date }, index) => (
            <div
              className="h-[45vh] about-bg p-3 md:p-6 lg:p-10 flex flex-col justify-end relative z-[10]"
              key={index}
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[#00000044] z-[1]"></div>

              <p className="rb-bold text-white text-xl mb-2 w-1/2 relative z-[10]">
                {title}
              </p>
              <p className="rb-bold text-white relative z-[10]">{date}</p>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
};

export default NewAndEvent;
