import Container from "Components/Container/Container";
import React from "react";
import FooterLinks from "Constant/Footer";
import { Link } from "react-router-dom";
import {
  FacebookLogo,
  InstagramLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
const Footer = () => {
  const footerLinks = FooterLinks();

  return (
    <footer className="bg-dark text-white py-16">
      <Container>
        <ul className="flex flex-col xl:flex-row lg:items-center justify-between gap-y-4 gap-x-10 border-b border-[#eeeeee67] pb-6">
          {footerLinks?.map(({ name, path, list, mega }, parentIndex) =>
            mega && list ? (
              list.map(({ name, id }, childIndex) => (
                <li
                  className="min-w-[fit-content] uppercase rb-bold text-sm"
                  key={id || `${parentIndex}-${childIndex}`}
                >
                  <Link to={`/shop/${id}`}>{name}</Link>
                </li>
              ))
            ) : (
              <li
                className="min-w-[fit-content] uppercase rb-bold text-sm"
                key={path || `${parentIndex}-${name}`}
              >
                <Link to={path}>{name}</Link>
              </li>
            )
          )}
        </ul>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between pt-6">
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

          <p className="flex items-center mt-2 lg:mt-0 gap-x-2 text-[#555] rb-bold">
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
