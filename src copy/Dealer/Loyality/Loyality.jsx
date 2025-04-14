import React from "react";
import Container from "Components/Container/Container";
import LoyalityTable from "./LoyalityTable";
const Loyality = () => {
  return (
    <main>
      <section>
        <Container>
          <div className="rb-bold text-4xl text-center py-14 border-b">
            <h1>Loyalty</h1>
          </div>

          <div className="text-center mt-10">
            <h5 className="rb-bold text-primary capitalize  text-4xl text-center">
              You have 100 points
            </h5>
            <p className="rb-light">Each point is equivalent to 1 litre</p>
          </div>
        </Container>
      </section>

      <LoyalityTable />
    </main>
  );
};

export default Loyality;
