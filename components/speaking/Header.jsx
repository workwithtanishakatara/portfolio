"use client";

import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const Header = () => {
  return (
    <section className="element w-full border-t border-white/10">
      <div className="mx-auto flex min-h-[460px] w-full max-w-[1200px] items-center px-5 py-16 md:min-h-[500px] md:py-20">
        <div className="max-w-[920px]">
          <p className="mb-5 text-sm font-semibold uppercase text-[#63E6BE]">
            Founder, strategist, and technical operator
          </p>
          <h1 className="text-5xl font-semibold leading-[1.05] text-white md:text-6xl">
            Tanisha Katara
          </h1>
          <p className="mt-6 max-w-[840px] text-2xl font-medium leading-snug text-white md:text-4xl">
            AI systems and blockchain infrastructure that work in the real world.
          </p>
          <p className="mt-6 max-w-[620px] text-base leading-relaxed text-white/75 md:text-lg">
            Product strategy, technical deployment, and mechanism design for teams building complex, high-stakes technology.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-5 py-3 font-medium text-[#132331] transition-colors hover:bg-[#63E6BE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore the work <BsArrowRight aria-hidden="true" />
            </Link>
            <Link
              href="/research"
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/60 px-5 py-3 font-medium text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Read the research
            </Link>
          </div>
          <div className="mt-10 flex gap-3" aria-hidden="true">
            <span className="h-1 w-16 bg-[#63E6BE]" />
            <span className="h-1 w-16 bg-[#FF5C5C]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
