"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import CardSections, { CustomCard } from "./CardSections";
import OrbitingCircles from "../ui/OrbitingCircle";
import { useMediaQuery } from "react-responsive";
import { urlFor } from "@/lib/ImageUrl";
import { Card } from "../working/WorkSearch";

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

  const Icons = {
    gitHub: () => (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.5487 0H3.45133C1.54521 0 0 1.54521 0 3.45133V26.0177C0 27.9238 1.54521 29.469 3.45133 29.469H26.5487C28.4548 29.469 30 27.9238 30 26.0177V3.45133C30 1.54521 28.4548 0 26.5487 0Z"
          fill="#6320EB"
        />
        <path
          d="M8.27763 25.9152C8.89053 25.9152 9.38735 25.4137 9.38735 24.795C9.38735 24.1766 8.89053 23.675 8.27763 23.675C7.66479 23.675 7.16797 24.1766 7.16797 24.795C7.16797 25.4137 7.66479 25.9152 8.27763 25.9152Z"
          fill="#FFFAF3"
        />
        <path
          d="M22.9401 17.9653C23.0052 17.9357 23.0669 17.9003 23.1257 17.8605C23.4797 17.6204 23.7124 17.2131 23.7124 16.7509C23.7124 16.3314 23.5203 15.957 23.2195 15.7116L9.39075 4.06578L9.38933 4.06485L9.30351 3.99254L9.30116 3.99058L9.39075 4.06578L9.38933 4.06485C9.36186 4.03964 9.33339 4.01537 9.30351 3.99254C9.08 3.81991 8.79957 3.71704 8.49612 3.71704C7.76243 3.71704 7.16797 4.31599 7.16797 5.05461V21.0152C7.16797 21.7539 7.76243 22.3523 8.49612 22.3523C8.81411 22.3523 9.10599 22.2398 9.33482 22.0521L9.35505 22.0352L14.1718 17.9499C14.3255 17.8296 14.4236 17.6418 14.4236 17.4309C14.4236 17.0681 14.1317 16.7737 13.7709 16.7737L11.6051 16.7739C11.2447 16.7739 10.9521 16.4798 10.9521 16.1166V11.6946C10.9521 11.3314 11.2446 11.0375 11.6048 11.0375C11.758 11.0375 11.8992 11.0908 12.0105 11.1796L14.6722 13.4071L18.0122 16.2176L18.1447 16.3292L18.1451 16.3297L18.0122 16.2176C18.0613 16.2486 18.106 16.2866 18.1451 16.3297C18.2521 16.4465 18.3171 16.6027 18.3171 16.7739C18.3171 16.9684 18.2333 17.143 18.0999 17.2633C18.0888 17.2735 18.0777 17.2827 18.0661 17.2918L18.0999 17.2633L11.1969 23.116C11.0476 23.2362 10.952 23.4216 10.952 23.6292C10.952 23.9919 11.2444 24.2862 11.6048 24.2862C11.7127 24.2862 11.8148 24.2596 11.9049 24.2125C11.9193 24.2053 11.9338 24.1969 11.9478 24.1883L11.8946 24.218L23.1257 17.8605"
          fill="#FFFAF3"
        />
      </svg>
    ),
    notion: () => (
      <img src="https://logowik.com/content/uploads/images/t_polygon-matic-icon3725.logowik.com.webp" />
    ),
    openai: () => (
      <img src="https://logowik.com/content/uploads/images/t_polygon-matic-icon3725.logowik.com.webp" />
    ),
    googleDrive: () => (
      <svg
        width="100"
        height="100"
        viewBox="0 0 87.3 78"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
          fill="#0066da"
        />
        <path
          d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
          fill="#00ac47"
        />
        <path
          d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
          fill="#ea4335"
        />
        <path
          d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
          fill="#00832d"
        />
        <path
          d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
          fill="#2684fc"
        />
        <path
          d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
          fill="#ffba00"
        />
      </svg>
    ),
    whatsapp: () => (
      <svg
        width="100"
        height="100"
        viewBox="0 0 175.216 175.552"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="b"
            x1="85.915"
            x2="86.535"
            y1="32.567"
            y2="137.092"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#57d163" />
            <stop offset="1" stopColor="#23b33a" />
          </linearGradient>
          <filter
            id="a"
            width="1.115"
            height="1.114"
            x="-.057"
            y="-.057"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="3.531" />
          </filter>
        </defs>
        <path
          d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0"
          fill="#b3b3b3"
          filter="url(#a)"
        />
        <path
          d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"
          fill="#ffffff"
        />
        <path
          d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"
          fill="url(#linearGradient1780)"
        />
        <path
          d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
          fill="url(#b)"
        />
        <path
          d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
          fill="#ffffff"
          fillRule="evenodd"
        />
      </svg>
    ),
  };

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
        <div className="space-y-2 lg:space-y-3 w-full">
          <p className="font-medium text-xl lg:text-2xl">{data.cta.subtitle}</p>
          <p className="font-semibold text-4xl lg:text-6xl">{data.cta.title}</p>
          <a
            href={data.cta.link}
            className="w-fit flex flex-row gap-2 justify-center items-center h-fit px-4 py-2 border hover:bg-black hover:text-white transition-all duration-300 border-black rounded-full"
          >
            {data.cta.buttonText} <BsArrowRight size={20} />
          </a>
        </div>
        <div className="w-full">
          <div className="relative flex h-[500px]  flex-col items-center justify-center overflow-hidden w-full">
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-5xl lg:text-8xl font-semibold leading-none text-transparent ">
              {data.cta.additionalSection.title}
            </span>

            {/* Inner Circles */}
            {data.cta.additionalSection.orbitOne.map((img, index) => {
              const delay = getDelay(
                index,
                data.cta.additionalSection.orbitOne.length
              );
              return (
                <OrbitingCircles
                  key={index}
                  className="size-[80px] border-none bg-transparent"
                  duration={20}
                  delay={delay}
                  radius={isMobile ? 60 : 80}
                >
                  <img className="!w-[35px]" src={urlFor(img).url()} />
                </OrbitingCircles>
              );
            })}

            {/* Outer Circles (reverse) */}

            {data.cta.additionalSection.orbitTwo.map((img, index) => {
              const delay = getDelay(
                index,
                data.cta.additionalSection.orbitTwo.length
              );
              return (
                <>
                  <OrbitingCircles
                    className="size-[80px] border-none bg-transparent"
                    radius={isMobile ? 140 : 190}
                    duration={20}
                    delay={delay}
                    reverse
                  >
                    <img className="!w-[35px]" src={urlFor(img).url()} />
                  </OrbitingCircles>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
