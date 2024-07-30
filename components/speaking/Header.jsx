"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FlipWords } from "../ui/flipingWord";
import Icon from "../GraphSvg";

const Header = ({ data }) => {
  const pathname = usePathname();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    switch (pathname) {
      case "/about":
        setTitle(data["about"].title);
        setDescription(data["about"].description);
        break;
      case "/":
        setTitle("Home");
        setDescription("");
        break;
      case "/writing":
        setTitle(data["writing"].title);
        setDescription(data["writing"].description);
        break;
      case "/speaking":
        setTitle(data["speaking"].title);
        setDescription(data["speaking"].description);
        break;
      case "/contact":
          setTitle("Contact");
          setDescription("Let’s get this conversation started. Tell us a bit about yourself, and we’ll get in touch as soon as we can.");
          break;
      default:
        setTitle("");
        setDescription("");
        break;
    }
  }, [pathname]);

  const words = [
    "Web3 Reputation",
    "Governance Innovation",
    "Decentralization",
    "Crypto Economics",
    "Investor Relations",
    "Go-to-Market",
    "Blockchain Consulting",
    "Web3 Research",
  ];

  return (
    <div className="element flex justify-center items-center w-full">
      <div
        style={{
          display:
            pathname === "/about" || pathname === "/" || pathname === "/working"
              ? "none"
              : "flex",
        }}
        className="px-5 py-10 justify-center items-center max-w-[1200px] w-full"
      >
        <div className="text-center flex flex-col justify-center items-center gap-5">
          <p className="text-5xl font-semibold">{title}</p>
          {description && (
            <p className="max-w-[900px] text-center">{description}</p>
          )}
        </div>
      </div>
      <div
        style={{
          display: pathname === "/" ? "flex" : "none",
        }}
        className="px-5 py-20 justify-start items-start max-w-[1200px] w-full flex-col text-3xl md:text-5xl tracking-tight leading-none font-medium"
      >
        {/* add the animated text here */}
        <span className="text-3xl md:text-5xl tracking-tight leading-none font-medium">
          Work with the best minds on
        </span>
        <div className="relative w-full">
          <FlipWords words={words} />
        </div>
      </div>
      <div
        style={{
          display: pathname === "/working" ? "flex" : "none",
        }}
        className="py-20 flex-col justify-center items-center"
      >
        <div className="size-[300px] md:size-[400px] lg:size-[500px] justify-center items-center flex">
        {pathname === "/working" &&  <Icon />}
         
        </div>
      </div>
    </div>
  );
};

export default Header;
