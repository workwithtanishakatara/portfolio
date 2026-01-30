"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FlipWords } from "../ui/flipingWord";
import Icon from "../GraphSvg";
import { BsArrowRight } from "react-icons/bs";

const Header = ({ data, homeData }) => {
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
        setTitle(data["contact"].title);
        setDescription(data["contact"].description);
        break;
      default:
        setTitle("");
        setDescription("");
        break;
    }
  }, [pathname]);

  return (
    <div className="element flex justify-center items-center w-full">
      <div
        style={{
          display:
            pathname === "/about" || pathname === "/" || pathname === "/work"
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
        className="px-5 py-20 justify-start items-start max-w-[1200px] w-full flex-col gap-1 text-2xl md:text-4xl tracking-tight leading-none font-medium"
      >
        <span className="text-2xl md:text-4xl tracking-tight  font-medium">
          {homeData?.title}
        </span>
        <div className="relative w-full space-x-3">
          <span>Getting the</span>
          <FlipWords words={homeData?.words} />
          <span>right is harder.</span>
        </div>
        <span className="text-2xl md:text-4xl tracking-tight font-medium">
          That's what Tanisha does.
        </span>
        <div className="flex mt-5 flex-row gap-2">
          <a
            href="/work"
            className="w-fit text-base font-normal tracking-normal z-50 flex flex-row gap-2 justify-center items-center h-fit px-4 py-2 border hover:bg-black hover:text-white transition-all duration-300 border-black rounded-full"
          >
            See case studies <BsArrowRight size={20} />
          </a>
        </div>
      </div>
      <div
        style={{
          display: pathname === "/work" ? "flex" : "none",
        }}
        className="py-20 flex-col justify-center items-center"
      >
        <div className="size-[300px] md:size-[400px] lg:size-[500px] justify-center items-center flex">
          {pathname === "/work" && <Icon />}
        </div>
      </div>
    </div>
  );
};

export default Header;
