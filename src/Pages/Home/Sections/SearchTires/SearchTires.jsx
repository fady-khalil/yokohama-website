import Container from "Components/Container/Container";
import React, { useState } from "react";
import bg from "assests/find-your-tires-bg.jpg";
import { CaretDoubleRight, Circle } from "@phosphor-icons/react";
import SelectInput from "form/Inputs/SelectInput";

const SearchTires = () => {
  // State variables for inputs
  const [typeValue, setTypeValue] = useState();
  const [yearValue, setYearValue] = useState();
  const [modelValue, setModelValue] = useState();
  const [trimValue, setTrimValue] = useState();

  // Event handlers for input changes
  const typeValueHandle = (e) => {
    setTypeValue(e.target.value);
  };

  const yearValueHandle = (e) => {
    setYearValue(e.target.value);
  };

  const modelValueHandle = (e) => {
    setModelValue(e.target.value);
  };

  const trimValueHandle = (e) => {
    setTrimValue(e.target.value);
  };

  // Options for select inputs
  const typeValueOption = ["BMW", "VOLVO", "JEEP", "FIAT"];
  const yearOptions = ["2022", "2021", "2020", "2019", "2018"]; // Example years, replace with actual options
  const modelOptions = ["Sedan", "SUV", "Truck"]; // Example models, replace with actual options
  const trimOptions = ["Standard", "Luxury", "Performance"]; // Example trims, replace with actual options

  return (
    <section className="py-primary" style={{ backgroundImage: `url(${bg})` }}>
      <Container>
        <div className=" text-white flex items-center justify-center flex-col">
          <h2 className="text-5xl rb-bold">Find your tires</h2>
          <div className="flex items-center justify-center w-3/4 mx-auto gap-x-4 mt-6">
            <span className="flex items-center gap-x-1">
              <Circle ne />
              <p>Vehicle</p>
            </span>
            <span className="flex items-center gap-x-1">
              <Circle />
              <p>Size</p>
            </span>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-x-1 w-3/4 mx-auto">
          {/* Select Inputs */}
          <SelectInput
            placeholder={"Type"}
            onChange={typeValueHandle}
            options={typeValueOption}
          />
          <SelectInput
            placeholder={"Year"}
            onChange={yearValueHandle}
            options={yearOptions}
          />
          <SelectInput
            placeholder={"Model"}
            onChange={modelValueHandle}
            options={modelOptions}
          />
          <SelectInput
            placeholder={"Trim"}
            onChange={trimValueHandle}
            options={trimOptions}
          />

          <button className="bg-primary px-4 py-3 mt-[4px]  text-white ">
            <CaretDoubleRight size={20} />
          </button>
        </div>
      </Container>
    </section>
  );
};

export default SearchTires;
