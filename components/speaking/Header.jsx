"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsArrowRight } from "react-icons/bs";

const pageIntroductions = {
  "/about": {
    label: "About",
    title: "Strategy grounded in how technical systems behave in practice.",
    description:
      "Tanisha works across AI deployment, blockchain infrastructure, product strategy, and mechanism design.",
  },
  "/work": {
    label: "Work",
    title: "Products, operating systems, and mechanisms built for real conditions.",
    description:
      "Selected client delivery, product launches, technical research, and open-source work across AI and blockchain.",
  },
  "/research": {
    label: "Research",
    title: "Independent research across agents, incentives, and institutions.",
    description:
      "Work on AI-agent coordination, identity and accountability, governance, validators, and crypto-economic systems.",
  },
  "/speaking": {
    label: "Speaking",
    title: "Making complex systems legible to technical and public audiences.",
    description:
      "Talks and workshops on AI-agent coordination, governance design, validators, privacy, and token economics.",
  },
  "/contact": {
    label: "Contact",
    title: "Bring the difficult problem, not a predetermined answer.",
    description:
      "For product, deployment, research, and strategy work across AI systems and blockchain infrastructure.",
  },
};

const Header = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <section className="element relative isolate w-full overflow-hidden border-t border-white/10">
        <Image
          src="/assets/opengraph-image.png"
          alt="Tanisha Katara speaking on stage"
          fill
          priority
          sizes="100vw"
          className="hero-portrait object-cover"
        />
        <div className="absolute inset-0 bg-[#1B2A39]/88 md:hidden" />
        <div className="absolute inset-y-0 left-0 hidden w-[64%] bg-[#1B2A39] md:block" />

        <div className="relative mx-auto flex min-h-[560px] w-full max-w-[1200px] items-center px-5 py-16 md:min-h-[620px] md:py-20">
          <div className="max-w-[700px]">
            <p className="mb-5 text-sm font-semibold uppercase text-[#63E6BE]">
              Founder, strategist, and technical operator
            </p>
            <h1 className="text-5xl font-semibold leading-[1.05] text-white md:text-7xl">
              Tanisha Katara
            </h1>
            <p className="mt-6 max-w-[680px] text-2xl font-medium leading-snug text-white md:text-4xl">
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
          </div>
        </div>
      </section>
    );
  }

  const introduction = pageIntroductions[pathname];

  if (!introduction) return null;

  return (
    <section className="element w-full border-t border-white/10">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 md:py-20">
        <p className="text-sm font-semibold uppercase text-[#63E6BE]">
          {introduction.label}
        </p>
        <h1 className="mt-4 max-w-[900px] text-4xl font-semibold leading-tight text-white md:text-6xl">
          {introduction.title}
        </h1>
        <p className="mt-5 max-w-[760px] text-base leading-relaxed text-white/70 md:text-lg">
          {introduction.description}
        </p>
      </div>
    </section>
  );
};

export default Header;
