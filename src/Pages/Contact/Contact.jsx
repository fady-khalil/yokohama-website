import React from "react";
import Container from "Components/Container/Container";
import bgImage from "assests/about/why-2.jpg";
import { MapPin, Phone, Storefront, Envelope } from "@phosphor-icons/react";
import ContactForm from "./ContactForm";
const Contact = () => {
  return (
    <main>
      <section
        className="about-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Container>
          <div className="relative py-primary flex flex-col items-center justify-center text-white text-center ">
            <div className="absolute inset-0 bg-[#dc0c177f] z-[1]"></div>
            <div className="relative z-[10]">
              <h1 className="rb-bold text-3xl mb-secondary">Contact us</h1>
            </div>
            <div className="flex flex-col gap-y-10 relative z-[10]">
              <a
                className=" flex flex-col items-center justify-center  w-max mx-auto"
                href=""
              >
                <MapPin weight="fill" size={26} />
                <p className="rb-bold w-3/4 mt-2">
                  M. Howayek SARL - An HMG holding company address: Jounieh
                  Highway , Dama Center
                </p>
              </a>
              <a
                className="relative flex flex-col items-center justify-center  w-max mx-auto"
                href=""
              >
                <div className="absolute w-[62px] h-[1px] -top-2 left-1/2 -translate-x-1/2 bg-white"></div>
                <Phone weight="fill" size={26} />
                <p className="rb-bold mt-2">+961 9 911311</p>
              </a>
              <a
                className="relative flex flex-col items-center justify-center  w-max mx-auto"
                href=""
              >
                <div className="absolute w-[62px] h-[1px] -top-2 left-1/2 -translate-x-1/2 bg-white"></div>
                <Storefront weight="fill" size={26} />
                <p className="rb-bold mt-2">1705 Jounieh Lebanon</p>
              </a>
              <a
                className="relative flex flex-col items-center justify-center  w-max mx-auto"
                href=""
              >
                <div className="absolute w-[62px] h-[1px] -top-2 left-1/2 -translate-x-1/2 bg-white"></div>
                <Envelope weight="fill" size={26} />
                <p className="rb-bold mt-2 ">info@yokohamalebanon.com</p>
              </a>
            </div>
          </div>
        </Container>
      </section>
      <ContactForm />
    </main>
  );
};

export default Contact;
