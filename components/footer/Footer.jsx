import { urlFor } from "@/lib/ImageUrl";
import Link from "next/link";
import React from "react";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = ({data}) => {
  return (
    <footer className="flex element  flex-col justify-center items-center w-full ">
      <div className="flex max-w-[1200px] w-full flex-col justify-center items-center p-5 gap-20">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="">
            <Link href={"/"} className="font-semibold text-xl md:text-2xl">
              Tanisha Katara
            </Link>
          </div>
          <div className="hidden md:flex flex-row gap-3">
            <Link href={"/about"}>About</Link>
            <Link href={"/speaking"}>Speaking</Link>
            <Link href={"/writing"}>Writing</Link>
            <Link href={"/working"}>Working</Link>
            <Link href={"/contact"}>Contact</Link>
          </div>
        </div>
        <div className="flex w-full flex-row justify-between gap-5 items-center">
          <div>
            <p>
              Developed by <span className="underline">Waleed</span>
            </p>
          </div>
          <div className="flex flex-row gap-2">
          {data.socialLinks.socialLinks.map((link, index) => (
            <Link target="_blank" href={link.link}>
             <img className="size-[20px]" src={urlFor(link.icon).url()} />
            </Link>
          ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
