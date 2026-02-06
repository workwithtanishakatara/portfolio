"use client";

import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseCircleSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import Header from "../speaking/Header";
import { urlFor } from "@/lib/ImageUrl";

const Navbar = ({ data, homeData }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex element flex-col justify-center items-center w-screec ">
      <div className="flex max-w-[1200px] w-full flex-col justify-center items-center p-5 gap-1">
        <div className="w-full hidden md:flex flex-row justify-end items-center gap-2">
          {data.socialLinks.socialLinks.map((link, index) => (
            <a target="_blank" href={link.link}>
              <img className="size-[20px]" src={urlFor(link.icon).url()} />
            </a>
          ))}
        </div>
        <div className="w-full flex flex-row justify-between items-center">
          <div className="">
            <a href={"/"} className="font-semibold text-xl md:text-2xl">
              Tanisha Katara
            </a>
          </div>
          <div className="hidden md:flex flex-row items-center gap-[35px]">
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
          <div onClick={() => setOpen(true)} className="flex md:hidden">
            <div className="border border-black py-1.5 px-3 rounded-full">
              <RxHamburgerMenu size={20} />
            </div>
          </div>
        </div>
      </div>
      <Header homeData={homeData} data={data} />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "smooth", ease: "easeInOut" }}
        className="w-screen z-50 h-screen overflow-hidden element fixed top-0"
      >
        <div className="w-full h-full relative p-3">
          <div
            onClick={() => setOpen(false)}
            className="w-full flex justify-end"
          >
            <IoCloseCircleSharp size={35} />
          </div>
          <div className="w-full h-full pb-14 gap-2 flex justify-center items-start flex-col">
            <Link
              onClick={() => setOpen(false)}
              className="text-4xl font-semibold"
              href={"/about"}
            >
              About
            </Link>
            <div className="w-full h-[1px] bg-black opacity-10"></div>
            <Link
              onClick={() => setOpen(false)}
              className="text-4xl font-semibold"
              href={"/speaking"}
            >
              Speaking
            </Link>
            <div className="w-full h-[1px] bg-black opacity-10"></div>
            <Link
              onClick={() => setOpen(false)}
              className="text-4xl font-semibold"
              href={"/research"}
            >
              Research
            </Link>
            <div className="w-full h-[1px] bg-black opacity-10"></div>
            <Link
              onClick={() => setOpen(false)}
              className="text-4xl font-semibold"
              href={"/work"}
            >
              Work
            </Link>
            <div className="w-full h-[1px] bg-black opacity-10"></div>
            <Link
              onClick={() => setOpen(false)}
              className="text-4xl font-semibold"
              href={"/contact"}
            >
              Contact
            </Link>
            <div className="w-full h-[1px] bg-black opacity-10"></div>
            <div className="w-full flex flex-row justify-start items-center gap-2">
              {data.socialLinks.socialLinks.map((link, index) => (
                <a target="_blank" href={link.link}>
                  <img className="size-[20px]" src={urlFor(link.icon).url()} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
