import Container from "Components/Container/Container";
import React from "react";
import footerLinks from "Constant/Footer";
import { Link } from "react-router-dom";
import {
  FacebookLogo,
  InstagramLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
const Footer = () => {
  return (
    <footer className="bg-dark text-white py-16">
      <Container>
        <ul className="flex items-center justify-between gap-x-10 border-b border-[#eeeeee67] pb-6">
          {footerLinks.map(({ name, path }, index) => (
            <li
              className=" min-w-[fit-content] uppercase rb-bold text-sm"
              key={index}
            >
              <Link>{name}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between pt-6">
          <ul className="flex items-center gap-x-4">
            <li className="bg-white p-1 text-xl rounded-full">
              <a href="">
                <FacebookLogo color="black" weight="bold" />
              </a>
            </li>
            <li className="bg-white p-1 text-xl rounded-full">
              <a href="">
                <InstagramLogo color="black" weight="bold" />
              </a>
            </li>
            <li className="bg-white p-1 text-xl rounded-full">
              <a href="">
                <YoutubeLogo color="black" weight="bold" />
              </a>
            </li>
          </ul>

          <p className="flex items-center gap-x-2 text-[#555] rb-bold">
            All Right Reserved 2024
            <a
              target="_blank"
              href="https://www.dowgroup.com/"
              className="underline"
              rel="noreferrer"
            >
              Dow group
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
