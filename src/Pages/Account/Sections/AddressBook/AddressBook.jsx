import React from "react";
import Shipping from "./Shipping/Shipping";
import Billing from "./Billing/Billing";
import Container from "Components/Container/Container";
const AddressBook = () => {
  return (
    <main className="py-secondary">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16">
          <Shipping />
          <Billing />
        </div>
      </Container>
    </main>
  );
};

export default AddressBook;
