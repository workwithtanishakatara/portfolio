"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import CardSections, { CustomCard } from "./CardSections";
import OrbitingCircles from "../ui/OrbitingCircle";
import { useMediaQuery } from "react-responsive";
import { urlFor } from "@/lib/ImageUrl";
import { Card } from "../working/WorkSearch";
import Image from "next/image";
import { InteractiveGridPattern } from "../ui/InteractiveGridPattern";
import { cn } from "@/lib/utils";

export const useIsMobile = () => {
  const [isSSR, setIsSSR] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return false; // or you can return a default value like null or true

  return isMobile;
};

const MainHomePage = ({ data }) => {
  return (
    <div>
      <CardSections data={data} />
    </div>
  );
};

export default MainHomePage;

export const MainHomePagePartTwo = ({ data, selectedWork }) => {
  const isMobile = useIsMobile();

  function getDelay(index, totalItems) {
    let maxDelay;
    switch (totalItems) {
      case 1:
      case 2:
        maxDelay = 10;
        break;
      case 3:
        maxDelay = 14;
        break;
      case 4:
        maxDelay = 14;
        break;
      case 5:
        maxDelay = 16;
        break;
      case 6:
        maxDelay = 17.5;
        break;
      default:
        maxDelay = (totalItems - 1) * 3.5; // an example of a generalized guess
    }

    if (totalItems === 1) {
      return 0;
    }
    const stepSize = maxDelay / (totalItems - 1);
    return stepSize * index;
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-col py-20 justify-center items-center">
        <div className="flex w-full flex-row justify-between gap-5 items-center">
          <p className="text-2xl md:text-5xl font-semibold">Selected works</p>
          <Link
            href={"/work"}
            className="w-fit md:w-fit flex flex-row gap-2 justify-center items-center h-fit px-4 py-2 border hover:bg-black hover:text-white transition-all duration-300 border-black rounded-full"
          >
            View All
            <BsArrowRight size={20} />
          </Link>
        </div>
        <div className="flex py-10 gap-10 flex-col w-full">
          <div className="grid md:grid-cols-1 lg:grid-cols-3  relative !h-full w-full gap-5 grid-cols-1 ">
            {selectedWork.works.map((work, index) => (
              <Card work={work} key={index} />
            ))}
          </div>
        </div>
      </div>
      <hr />
      <div className="w-full flex py-10 flex-col lg:flex-row items-center">
        <div className="w-full rounded-xl element relative p-20">
         
           <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
        )}
        width={20}
        height={20}
        squares={[80, 80]}
        squaresClassName="hover:fill-blue-500 opacity-30"
      />
       <div className="space-y-2 flex flex-col justify-center items-center lg:space-y-3 w-full">
            <p className="font-medium text-center text-xl lg:text-2xl">
              {data.cta.subtitle}
            </p>
            <p className="font-semibold text-center text-4xl lg:text-6xl">
              {data.cta.title}
            </p>
            <a
              href={data.cta.link}
              target="_blank"
              className="w-fit z-50 flex flex-row gap-2 justify-center items-center h-fit px-4 py-2 border hover:bg-black hover:text-white transition-all duration-300 border-black rounded-full"
            >
              {data.cta.buttonText} <BsArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
