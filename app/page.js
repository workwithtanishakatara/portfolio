import Testimonials from "@/components/Testimonials";
import PressShowcase from "@/components/home/PressShowcase";
import Marquee from "@/components/ui/InfiniteScroll";
import { fetchData } from "@/lib/FetchData";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const logos = [
  ["Ethereum", "https://ethereum.org/", "/assets/logos/ethereum.png"],
  ["Polygon", "https://polygon.technology/", "/assets/logos/polygon.png"],
  ["Avail", "https://avail.io/", "/assets/logos/avail.webp"],
  ["Filecoin", "https://filecoin.io/", "/assets/logos/filecoin.png"],
  ["Mina", "https://minaprotocol.com/", "/assets/logos/mina.png"],
  ["Aragon", "https://aragon.org/", "/assets/logos/Aragon.png"],
  ["Juno", "https://www.junofinance.com/", "/assets/logos/Juno.png"],
  ["DaoLens", "https://daolens.io/", "/assets/logos/DaoLens.webp"],
];

const metrics = [
  ["8+ years", "Across strategy, product, and technical delivery"],
  ["11+ clients", "Built through referrals and long-term relationships"],
  ["100%", "Client renewal or contract-extension rate"],
  ["2M+ users", "Reached through the Polygon Governance Hub"],
];

const practices = [
  {
    label: "AI systems",
    color: "#087F5B",
    title: "From model capability to useful workflow.",
    description:
      "Agent workflows, identity and accountability, LLM cost economics, technical discovery, evaluation logic, and deployment strategy.",
    examples: "cacheeconomics, Ethereum governance AI, Moltbook consensus research, and AI-agent identity research.",
  },
  {
    label: "Blockchain infrastructure",
    color: "#E03131",
    title: "From mechanism design to live operation.",
    description:
      "Governance, validators, staking, privacy, payments, treasury systems, protocol launches, and crypto-economic design.",
    examples: "Filecoin, Polygon, Avail, Mina, Aragon, Juno, Ethereum, and early-stage infrastructure teams.",
  },
];

const cacheLinks = {
  essay: "https://commodiverus388593.substack.com/p/cache-economics-how-to-stop-paying",
  github: "https://github.com/Tanisha-Katara/cacheeconomics",
};

const researchLinks = [
  {
    title: "Governance and Vote Escrow",
    area: "Governance design",
    href: "https://paragraph.com/@polygon-governance/JnmIX4ReBP1HZRgI4GB0",
  },
  {
    title: "MoltBook AI Agents Consensus",
    area: "AI-agent coordination",
    href: "https://github.com/Tanisha-Katara/MoltbookGovernanceAnalysis/blob/main/prevoutput/consensus_report.md",
  },
  {
    title: "Capital Concentration in Blockchain Economies",
    area: "Network economics",
    href: "https://tanisha-katara.github.io/validator-paper-academic/",
  },
  {
    title: "Every AI Agent Will Need a Passport",
    area: "Identity and accountability",
    href: "https://crypto.news/every-ai-agent-will-need-a-passport-opinion/",
  },
  {
    title: "Multi Asset Consensus for Web3 Security",
    area: "Crypto-economic security",
    href: "https://tanisha-katara.github.io/avail-fusion-whitepaper/",
  },
];

function ExternalLink({ href, children, icon: Icon = FiExternalLink }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex min-h-11 items-center gap-2 rounded-md border border-black/20 px-4 py-2 text-sm font-medium transition-colors hover:border-black hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      {children} <Icon aria-hidden="true" />
    </a>
  );
}

function WorkPreview({ work, index }) {
  return (
    <article
      className={`group flex flex-col py-6 md:min-h-[250px] md:px-6 md:py-7 md:first:pl-0 md:last:pr-0 ${
        index > 0 ? "border-t border-black/15 md:border-l md:border-t-0" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold uppercase text-black/45">
          {(work.group || []).map((group) => (
            <span key={group._id || group.name}>{group.name}</span>
          ))}
        </div>
        <p className="shrink-0 text-xs font-semibold tabular-nums text-black/30">
          {String(index + 1).padStart(2, "0")}
        </p>
      </div>
      <h3 className="mt-5 text-xl font-semibold leading-tight md:text-[22px]">{work.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-black/60 md:line-clamp-3">
        {work.description}
      </p>
      {work.link && (
        <a
          href={work.link}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold underline decoration-black/30 underline-offset-4 transition-[gap] hover:gap-3 hover:decoration-black md:mt-auto md:pt-5"
        >
          View project <FiExternalLink aria-hidden="true" />
        </a>
      )}
    </article>
  );
}

export default async function Home() {
  const data = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22homePage%22%5D%5B0%5D%0A",
  );

  const selectedWork = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22workingPage%22%5D%5B0%5D%7B%0A+works%5B0...3%5D%7B%0A++++title%2C%0A++++description%2C%0A++++link%2C%0A++++image%2C%0A++++%22group%22%3A+group%5B%5D-%3E%7B%0A++++++_id%2C%0A++++++name%2C%0A++++%7D%2C%0A++++%22subGroup%22%3A+subGroup%5B%5D-%3E%7B%0A++++++_id%2C%0A++++++name%2C%0A++++%7D%0A++%7D%0A%7D%0A",
  );

  const contactData = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22contactPage%22%5D%5B0%5D",
  );

  return (
    <main>
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 px-5 py-10 md:grid-cols-4 md:py-12">
          {metrics.map(([value, description], index) => (
            <div
              key={value}
              className={`py-4 pr-4 md:py-0 ${index > 0 ? "md:border-l md:border-black/10 md:pl-6" : ""}`}
            >
              <p className="text-2xl font-semibold md:text-3xl">{value}</p>
              <p className="mt-2 max-w-[220px] text-xs leading-relaxed text-black/55 md:text-sm">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1200px] py-14 md:py-16">
          <p className="text-center text-sm font-semibold uppercase text-black/45">
            Protocols and organizations advised
          </p>
          <div className="relative mt-9 w-full overflow-hidden">
            <Marquee className="[--duration:24s]">
              {logos.map(([name, href, logo]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={name}
                  className="mr-14 flex h-14 w-[130px] shrink-0 items-center justify-center opacity-45 grayscale transition hover:opacity-100 hover:grayscale-0 focus-visible:opacity-100"
                >
                  <Image
                    src={logo}
                    width={120}
                    height={56}
                    alt={`${name} logo`}
                    className="max-h-11 max-w-[120px] object-contain"
                  />
                </a>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      <PressShowcase />

      <section className="border-y border-black/10 bg-[#F4F7F6]">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase text-black/45">The practice</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                Two technical domains. One way of working.
              </h2>
              <p className="mt-5 max-w-[500px] leading-relaxed text-black/60">
                Start with the actual workflow, incentives, and constraints. Then design the product, mechanism, or operating model that can survive contact with users.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {practices.map((practice) => (
                <article key={practice.label} className="border-t-4 pt-5" style={{ borderColor: practice.color }}>
                  <p className="text-sm font-semibold uppercase" style={{ color: practice.color }}>
                    {practice.label}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight">{practice.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-black/65">{practice.description}</p>
                  <p className="mt-4 text-sm leading-relaxed text-black/45">{practice.examples}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
          <div className="flex flex-col justify-between gap-5 border-b border-black/15 pb-7 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-[#087F5B]">Applied AI</p>
              <h2 className="mt-3 text-4xl font-semibold md:text-5xl">cacheeconomics</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <ExternalLink href={cacheLinks.essay}>Read the launch essay</ExternalLink>
              <ExternalLink href={cacheLinks.github} icon={FiGithub}>View on GitHub</ExternalLink>
            </div>
          </div>
          <div className="grid gap-8 py-8 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
            <p className="max-w-[720px] text-2xl font-medium leading-snug md:text-3xl">
              A local Python tool that turns opaque LLM prompt-cache spend into a concrete list of technical fixes.
            </p>
            <p className="text-sm leading-relaxed text-black/60 md:text-base">
              It separates fresh input, cache reads, and cache writes; reconciles costs to provider bills; and identifies TTL, marker-placement, model-switch, and prefix-reuse problems. It supports Claude Code transcripts, LiteLLM logs, Bedrock, Vertex, and request exports without sending local prompt data over the network.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#FAFAF9]">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-12 md:py-16">
          <div className="flex items-end justify-between gap-5 pb-6">
            <div>
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">Selected work</h2>
              <p className="mt-2 text-sm text-black/55 md:text-base">
                Product launches, technical research, and governance systems.
              </p>
            </div>
            <Link
              href="/work"
              className="hidden min-h-11 items-center gap-2 rounded-md border border-black/20 px-4 py-2 text-sm font-medium transition-colors hover:border-black hover:bg-black hover:text-white sm:inline-flex"
            >
              View all <BsArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="grid border-y border-black/15 md:grid-cols-3">
            {(selectedWork?.works || []).map((work, index) => (
              <WorkPreview key={work.title} work={work} index={index} />
            ))}
          </div>
          <Link
            href="/work"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-md border border-black/20 px-4 py-2 text-sm font-medium sm:hidden"
          >
            View all <BsArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[0.72fr_1.28fr] md:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase text-black/45">Public record</p>
              <h2 className="mt-3 max-w-[420px] text-4xl font-semibold leading-tight md:text-5xl">
                Research and ideas in public.
              </h2>
              <p className="mt-5 max-w-[390px] leading-relaxed text-black/55">
                Published research and open-source work across AI agents, governance, validators, and crypto-economic systems.
              </p>
              <Link
                href="/research"
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md border border-black/20 px-4 py-2 text-sm font-medium transition-colors hover:border-black hover:bg-black hover:text-white"
              >
                Explore all research <BsArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className="border-t border-black/20">
              {researchLinks.map((research, index) => (
                <a
                  key={research.title}
                  href={research.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group grid min-h-[104px] grid-cols-[38px_1fr_auto] items-center gap-3 border-b border-black/15 py-5 transition-[background-color,padding] duration-300 hover:bg-[#F4F7F6] hover:px-4 focus-visible:bg-[#F4F7F6] focus-visible:px-4 focus-visible:outline-none md:grid-cols-[52px_1fr_auto]"
                >
                  <span className="self-start pt-1 text-xs font-semibold tabular-nums text-black/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase text-[#087F5B]">{research.area}</span>
                    <span className="mt-2 block text-lg font-semibold leading-snug md:text-xl">{research.title}</span>
                  </span>
                  <FiExternalLink className="mr-1 text-lg text-black/35 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <Link
            href="/speaking"
            className="group mt-12 grid overflow-hidden border-y border-black/20 transition-colors duration-300 hover:bg-[#1B2A39] hover:text-white focus-visible:bg-[#1B2A39] focus-visible:text-white focus-visible:outline-none md:grid-cols-[260px_1fr_auto] md:items-stretch"
          >
            <span className="relative block h-[190px] overflow-hidden md:h-full md:min-h-[190px]">
              <Image
                src="/assets/hero-speaking.jpg"
                alt="Tanisha Katara speaking at EthCC"
                fill
                sizes="(min-width: 768px) 260px, 100vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </span>
            <span className="block px-5 py-7 md:px-8 md:py-8">
              <span className="text-xs font-semibold uppercase text-[#087F5B] transition-colors group-hover:text-[#63E6BE]">Speaking</span>
              <span className="mt-3 block max-w-[620px] text-2xl font-semibold leading-tight md:text-3xl">
                Talks, panels, and workshops.
              </span>
              <span className="mt-3 block max-w-[620px] text-sm leading-relaxed text-black/55 transition-colors group-hover:text-white/65 md:text-base">
                Talks and panels on AI-agent coordination, governance design, validators, privacy, and token economics.
              </span>
            </span>
            <span className="flex items-center px-5 pb-7 md:px-8 md:pb-0">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:translate-x-1">
                <BsArrowRight aria-hidden="true" />
              </span>
            </span>
          </Link>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1200px] px-5">
        <Testimonials data={contactData} />
      </div>

      <section className="element border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col justify-between gap-8 px-5 py-16 md:flex-row md:items-center md:py-20">
          <div>
            <p className="text-sm font-semibold uppercase text-[#63E6BE]">Start a conversation</p>
            <h2 className="mt-3 max-w-[720px] text-4xl font-semibold leading-tight text-white md:text-5xl">
              Working through a difficult product, deployment, or mechanism question?
            </h2>
          </div>
          <a
            href="https://calendly.com/tanisha-katara/office-hours-with-tanisha-katara"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md bg-white px-5 py-3 font-medium text-[#132331] transition-colors hover:bg-[#63E6BE]"
          >
            Schedule a call <BsArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
