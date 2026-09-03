"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiExternalLink,
  FiMaximize2,
  FiMinus,
  FiPlus,
  FiRotateCcw,
  FiX,
} from "react-icons/fi";

const pressFeatures = [
  {
    publication: "Crypto India Magazine",
    type: "Cover feature",
    year: "2026",
    title: "Tanisha Katara is Redesigning the Way Web3 Governs Itself",
    href: "https://cryptoindiamagazine.com/tanisha-katara-is-redesigning-the-way-web3-governs-itself/",
    image: "/assets/press/crypto-india.png",
    imageClass: "object-cover object-center",
  },
  {
    publication: "Blockchain Reporter",
    type: "Interview",
    year: "2026",
    title: "From DAO Power Struggles to AI Agent Coordination",
    href: "https://blockchainreporter.net/from-dao-power-struggles-to-ai-agent-coordination/",
    image: "/assets/press/blockchain-reporter.webp",
    imageClass: "object-cover object-center",
  },
  {
    publication: "Blockcast",
    type: "Podcast",
    year: "2026",
    title: "Designing Decentralization: Governance, Power, and the Validator Problem",
    href: "https://www.blockhead.co/2026/03/03/blockcast-86-licensed-to-shill-designing-decentralization-governance-power-and-the-validator-problem/",
    image: "/assets/press/blockcast.png",
    imageClass: "object-cover object-center",
  },
  {
    publication: "DailyAI",
    type: "Interview",
    year: "2024",
    title: "Interview: Blockchain and Web3 Strategy",
    href: "https://dailyai.com/da/2024/05/interview-tanisha-katara-blockchain-and-web3-strategist/",
    image: "/assets/press/dailyai.png",
    imageClass: "object-cover object-center",
  },
  {
    publication: "Criptotendencias",
    type: "Profile",
    year: "2026",
    title: "Codigo, consenso y credibilidad: repensando el poder en Web3",
    href: "https://www.criptotendencias.com/base-de-conocimiento/codigo-consenso-y-credibilidad-repensando-el-poder-en-web3/",
    image: "/assets/press/cryptotendencias.jpg",
    imageClass: "object-cover object-center",
  },
  {
    publication: "CryptoSlate",
    type: "Expert commentary",
    year: "2026",
    title: "Why Ethereum Now Needs Privacy Just to Scale",
    href: "https://cryptoslate.com/ethereum-bots-are-burning-over-50-of-gas-fees-so-eth-now-needs-privacy-just-to-scale/",
    image: "/assets/press/cryptoslate.jpg",
    imageClass: "object-cover object-center",
  },
  {
    publication: "The Defiant",
    type: "Expert commentary",
    year: "2026",
    title: "Why Bitcoin Crashed Over 10% in One Week",
    href: "https://thedefiant.io/news/markets/why-bitcoin-crashed-over-10-in-one-week",
    image: "/assets/press/defiant.png",
    imageClass: "object-contain object-center",
    imageBackground: "bg-white",
  },
  {
    publication: "Cryptonews",
    type: "Expert commentary",
    year: "2026",
    title: "Ethereum in a Bloodbath: Analysts Call It a Lost Month",
    href: "https://cryptonews.com/reports/ethereum-in-a-bloodbath-analysts-expect-a-lost-month-for-eth-price/",
    image: "/assets/press/cryptonews.png",
    imageClass: "object-cover object-center",
  },
];

function PressCard({ feature, size = "stacked", onSelect }) {
  const desktopSize = {
    feature: "md:h-[412px] md:w-[500px]",
    wide: "md:h-[412px] md:w-[460px]",
    stacked: "md:h-[200px] md:w-[320px]",
  }[size];
  const titleSize = size === "stacked" ? "md:text-[15px]" : "md:text-lg";
  const captionHeight = size === "stacked" ? "md:min-h-[84px] md:p-3" : "md:min-h-[112px] md:p-4";

  return (
    <button
      type="button"
      onClick={() => onSelect(feature)}
      className={`group relative flex h-[320px] w-[82vw] max-w-[360px] shrink-0 snap-center flex-col overflow-hidden rounded-md border border-black/15 bg-white text-left transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:max-w-none ${desktopSize}`}
      aria-label={`Expand ${feature.publication}: ${feature.title}`}
    >
      <span className={`relative block min-h-0 flex-1 overflow-hidden bg-[#E9ECEB] ${feature.imageBackground || ""}`}>
        <Image
          src={feature.image}
          alt=""
          fill
          sizes={size === "feature" ? "(min-width: 768px) 500px, 82vw" : "(min-width: 768px) 460px, 82vw"}
          className={`${feature.imageClass} transition-transform duration-700 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]`}
        />
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-black/45 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <FiMaximize2 aria-hidden="true" />
        </span>
      </span>
      <span className={`block min-h-[104px] shrink-0 border-t border-black/10 p-4 text-black ${captionHeight}`}>
        <span className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase text-black/45">
          <span>{feature.publication}</span>
          <span aria-hidden="true">/</span>
          <span>{feature.year}</span>
        </span>
        <span className={`line-clamp-2 block max-w-[430px] text-lg font-semibold leading-tight ${titleSize}`}>
          {feature.title}
        </span>
      </span>
    </button>
  );
}

function PressStack({ children }) {
  return <div className="contents md:flex md:w-[320px] md:shrink-0 md:flex-col md:gap-3">{children}</div>;
}

export default function PressShowcase() {
  const viewportRef = useRef(null);
  const directionRef = useRef(1);
  const pauseUntilRef = useRef(0);
  const hoverPausedRef = useRef(false);
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(1);

  const pauseFor = useCallback((duration = 3200) => {
    pauseUntilRef.current = performance.now() + duration;
  }, []);

  const scrollRail = useCallback(
    (direction) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      pauseFor(4200);
      viewport.scrollBy({
        left: direction * Math.min(viewport.clientWidth * 0.82, 720),
        behavior: "smooth",
      });
    },
    [pauseFor],
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    let frame;
    let previousTime = performance.now();
    pauseUntilRef.current = previousTime + 1600;

    const animate = (time) => {
      const viewport = viewportRef.current;
      const elapsed = Math.min(time - previousTime, 36);
      previousTime = time;

      if (viewport && !document.hidden && !hoverPausedRef.current && time > pauseUntilRef.current) {
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;
        if (maxScroll > 0) {
          if (viewport.scrollLeft >= maxScroll - 2) directionRef.current = -1;
          if (viewport.scrollLeft <= 2) directionRef.current = 1;
          viewport.scrollLeft += directionRef.current * 0.24 * (elapsed / 16.67);
        }
      }

      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    setZoom(1);
  }, [selected]);

  return (
    <Dialog.Root open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
      <section aria-labelledby="press-heading" className="border-y border-black/10 bg-[#F6F7F5] py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto w-full max-w-[1400px]"
        >
          <div className="mx-auto flex w-full max-w-[1200px] items-end justify-between gap-6 px-5">
            <div>
              <p className="text-sm font-semibold uppercase text-[#087F5B]">Featured in</p>
              <h2 id="press-heading" className="mt-3 max-w-[760px] text-[28px] font-semibold leading-tight md:text-5xl">
                Press, interviews, and public commentary.
              </h2>
            </div>
            <div className="hidden shrink-0 gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollRail(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 bg-white transition-colors hover:border-black hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                aria-label="Previous press features"
                title="Previous press features"
              >
                <FiArrowLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollRail(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 bg-white transition-colors hover:border-black hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                aria-label="Next press features"
                title="Next press features"
              >
                <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={viewportRef}
            className="press-viewport mt-9 overflow-x-auto px-5 pb-2 snap-x snap-mandatory md:snap-none"
            onMouseEnter={() => {
              hoverPausedRef.current = true;
            }}
            onMouseLeave={() => {
              hoverPausedRef.current = false;
              pauseFor(1000);
            }}
            onPointerDown={() => pauseFor(4200)}
            onTouchStart={() => pauseFor(4200)}
            onWheel={() => pauseFor(4200)}
            onFocusCapture={() => {
              hoverPausedRef.current = true;
            }}
            onBlurCapture={() => {
              hoverPausedRef.current = false;
              pauseFor(1200);
            }}
          >
            <div className="mx-auto flex w-max min-w-full gap-3 md:px-[max(0px,calc((100%_-_1200px)/2))]">
              <PressCard feature={pressFeatures[0]} size="feature" onSelect={setSelected} />
              <PressStack>
                <PressCard feature={pressFeatures[1]} onSelect={setSelected} />
                <PressCard feature={pressFeatures[2]} onSelect={setSelected} />
              </PressStack>
              <PressStack>
                <PressCard feature={pressFeatures[3]} onSelect={setSelected} />
                <PressCard feature={pressFeatures[4]} onSelect={setSelected} />
              </PressStack>
              <PressCard feature={pressFeatures[5]} size="wide" onSelect={setSelected} />
              <PressStack>
                <PressCard feature={pressFeatures[6]} onSelect={setSelected} />
                <PressCard feature={pressFeatures[7]} onSelect={setSelected} />
              </PressStack>
            </div>
          </div>
        </motion.div>
      </section>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm data-[state=open]:animate-in" />
        <Dialog.Content className="fixed inset-0 z-[101] flex flex-col bg-[#101416] text-white focus:outline-none md:inset-6 md:rounded-md md:border md:border-white/15">
          {selected && (
            <>
              <div className="flex min-h-16 shrink-0 items-center justify-between gap-4 border-b border-white/15 px-4 md:px-6">
                <div className="min-w-0">
                  <Dialog.Title className="truncate text-sm font-semibold md:text-base">{selected.publication}</Dialog.Title>
                  <Dialog.Description className="truncate text-xs text-white/55">{selected.type}</Dialog.Description>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setZoom((value) => Math.max(1, value - 0.25))}
                    disabled={zoom <= 1}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Zoom out"
                    title="Zoom out"
                  >
                    <FiMinus aria-hidden="true" />
                  </button>
                  <span className="w-11 text-center text-xs tabular-nums text-white/65">{Math.round(zoom * 100)}%</span>
                  <button
                    type="button"
                    onClick={() => setZoom((value) => Math.min(1.75, value + 0.25))}
                    disabled={zoom >= 1.75}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Zoom in"
                    title="Zoom in"
                  >
                    <FiPlus aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoom(1)}
                    className="hidden h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 sm:flex"
                    aria-label="Reset zoom"
                    title="Reset zoom"
                  >
                    <FiRotateCcw aria-hidden="true" />
                  </button>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                      aria-label="Close expanded press feature"
                      title="Close"
                    >
                      <FiX aria-hidden="true" />
                    </button>
                  </Dialog.Close>
                </div>
              </div>

              <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto p-4 md:p-8">
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                  <img
                    src={selected.image}
                    alt={`${selected.publication} artwork for ${selected.title}`}
                    className="max-h-full max-w-full rounded-sm object-contain transition-transform duration-300 ease-out"
                    style={{ transform: `scale(${zoom})` }}
                  />
                </div>
              </div>

              <div className="flex shrink-0 flex-col justify-between gap-4 border-t border-white/15 px-4 py-4 md:flex-row md:items-center md:px-6">
                <p className="max-w-[820px] text-base font-medium leading-snug md:text-lg">{selected.title}</p>
                <a
                  href={selected.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#63E6BE]"
                >
                  Read original <FiExternalLink aria-hidden="true" />
                </a>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
