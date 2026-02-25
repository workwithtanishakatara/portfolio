import { urlFor } from "@/lib/ImageUrl";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/ToolTip";
import Image from "next/image";

const Footer = ({ data }) => {
  return (
    <footer className="flex element  flex-col justify-center items-center w-full ">
      <div className="flex max-w-[1200px] w-full flex-col justify-center items-center py-10 px-5 ">
        <div className="w-full pt-1 relative mb-20 flex flex-row justify-between items-center">
          <div className="">
            <Link href={"/"} className="font-semibold text-xl md:text-2xl">
              Katara Consulting Group
            </Link>
          </div>
          {/* <div className="xl:absolute w-fit xl:inline transition-all duration-500 hover:-rotate-[30deg] -translate-x-[30px] xl:-translate-x-[100px] top-0 cursor-pointer z-50 ">
            <span className="font-semibold pointer-events-none select-none w-fit text-5xl">
              T
            </span>
          </div> */}
          <div className="hidden md:flex flex-row gap-[35px] text-lg">
            <Link
              className="hover:scale-110 text-lg transition-all"
              href={"/about"}
            >
              About
            </Link>
            <Link
              className="hover:scale-110 text-lg transition-all"
              href={"/speaking"}
            >
              Speaking
            </Link>
            <Link
              className="hover:scale-110 text-lg transition-all"
              href={"/research"}
            >
              Research
            </Link>
            <Link
              className="hover:scale-110 text-lg transition-all"
              href={"/work"}
            >
              Work
            </Link>
            <Link
              className="hover:scale-110 text-lg transition-all"
              href={"/contact"}
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="flex w-full flex-row justify-between gap-5 items-center">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/waleeddotdev/"
                  >
                    Developed by <span className="underline">Waleed</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex flex-col gap-2">
                    <p> Looking for a website🚀 Contact Me!</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-row gap-2">
            {data.socialLinks.socialLinks.map((link, index) => (
              <Link target="_blank" href={link.link}>
                <Image
                  width={15}
                  height={15}
                  loading="lazy"
                  className="size-[20px] invert"
                  src={urlFor(link.icon).url()}
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-row justify-between gap-5 items-center">
          <div>
            <a target="_blank" href="https://www.linkedin.com/in/kanuri-pushyanth/">
              PM'ed by <span className="underline">Pushyanth</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
