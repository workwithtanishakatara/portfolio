"use client";

import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseCircleSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import Header from "../speaking/Header";
import { usePathname } from "next/navigation";
import { urlFor } from "@/lib/ImageUrl";

const Navbar = ({ data }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const socialLinks = data?.socialLinks?.socialLinks || [];

  return (
    <nav className="flex element flex-col justify-center items-center w-full ">
      <div className="flex max-w-[1200px] w-full flex-col justify-center items-center px-5 py-5">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="">
            <a href={"/"} className="font-semibold text-xl md:text-2xl">
              Katara Consulting Group
            </a>
          </div>
          <div className="hidden md:flex flex-row items-center gap-7">
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
            <div className="ml-1 flex items-center gap-1 border-l border-white/15 pl-4">
              {socialLinks.map((link, index) => (
                <a
                  key={link._key || link.link || index}
                  target="_blank"
                  rel="noreferrer noopener"
                  href={link.link}
                  aria-label={`Open social profile ${index + 1}`}
                  className="flex size-8 items-center justify-center rounded-md transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <img
                    className="size-[17px] invert"
                    src={urlFor(link.icon).url()}
                    alt=""
                  />
                </a>
              ))}
            </div>
          </div>
          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex md:hidden"
          >
            <span className="flex size-10 items-center justify-center rounded-md border border-white/60">
              <RxHamburgerMenu size={20} />
            </span>
          </button>
        </div>
      </div>
      {pathname === "/" && <Header />}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "smooth", ease: "easeInOut" }}
        className="w-screen z-50 h-screen overflow-hidden element fixed top-0"
      >
        <div className="w-full h-full relative p-3">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="w-full flex justify-end"
          >
            <IoCloseCircleSharp size={35} />
          </button>
          <div className="w-full h-full pb-14 gap-2 flex justify-center items-start flex-col">
            <Link
              onClick={() => setOpen(false)}
              className="text-4xl font-semibold"
              href={"/about"}
            >
              About
            </Link>
            <div className="w-full h-px bg-white/10"></div>
            <Link
              onClick={() => setOpen(false)}
              className="text-4xl font-semibold"
              href={"/speaking"}
            >
              Speaking
            </Link>
            <div className="w-full h-px bg-white/10"></div>
            <Link
              onClick={() => setOpen(false)}
              className="text-4xl font-semibold"
              href={"/research"}
            >
              Research
            </Link>
            <div className="w-full h-px bg-white/10"></div>
            <Link
              onClick={() => setOpen(false)}
              className="text-4xl font-semibold"
              href={"/work"}
            >
              Work
            </Link>
            <div className="w-full h-px bg-white/10"></div>
            <Link
              onClick={() => setOpen(false)}
              className="text-4xl font-semibold"
              href={"/contact"}
            >
              Contact
            </Link>
            <div className="w-full h-px bg-white/10"></div>
            <div className="w-full flex flex-row justify-start items-center gap-2">
              {socialLinks.map((link, index) => (
                <a
                  key={link._key || link.link || index}
                  target="_blank"
                  rel="noreferrer noopener"
                  href={link.link}
                  aria-label={`Open social profile ${index + 1}`}
                  className="flex size-10 items-center justify-center rounded-md border border-white/20"
                >
                  <img
                    className="size-[20px] invert"
                    src={urlFor(link.icon).url()}
                    alt=""
                  />
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
