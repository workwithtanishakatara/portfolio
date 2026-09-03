import Testimonials from "@/components/Testimonials";
import PressShowcase from "@/components/home/PressShowcase";
import Marquee from "@/components/ui/InfiniteScroll";
import { fetchData } from "@/lib/FetchData";
import { urlFor } from "@/lib/ImageUrl";
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
  ["Governance and Vote Escrow", "https://paragraph.com/@polygon-governance/JnmIX4ReBP1HZRgI4GB0"],
  ["MoltBook AI Agents Consensus", "https://github.com/Tanisha-Katara/MoltbookGovernanceAnalysis/blob/main/prevoutput/consensus_report.md"],
  ["Capital Concentration in Blockchain Economies", "https://tanisha-katara.github.io/validator-paper-academic/"],
  ["Every AI Agent Will Need a Passport", "https://crypto.news/every-ai-agent-will-need-a-passport-opinion/"],
  ["Multi Asset Consensus for Web3 Security", "https://tanisha-katara.github.io/avail-fusion-whitepaper/"],
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

function WorkPreview({ work }) {
  const image = work.image ? urlFor(work.image).width(900).height(560).url() : null;

  return (
    <article className="border-t border-black/15 py-7">
      <div className="grid gap-6 md:grid-cols-[140px_1fr]">
        {image && (
          <img
            src={image}
            alt=""
            loading="lazy"
            className="h-[120px] w-full rounded-md border border-black/10 bg-white object-contain p-3"
          />
        )}
        <div>
          <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold uppercase text-black/50">
            {(work.group || []).map((group) => (
              <span key={group._id || group.name}>{group.name}</span>
            ))}
          </div>
          <h3 className="text-2xl font-semibold leading-tight">{work.title}</h3>
          <p className="mt-3 max-w-[680px] text-sm leading-relaxed text-black/65 md:text-base">
            {work.description}
          </p>
          {work.link && (
            <a
              href={work.link}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline decoration-black/30 underline-offset-4 hover:decoration-black"
            >
              View project <FiExternalLink aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
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
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
          <div className="flex items-end justify-between gap-5 pb-7">
            <div>
              <p className="text-sm font-semibold uppercase text-black/45">Selected work</p>
              <h2 className="mt-3 max-w-[760px] text-3xl font-semibold md:text-4xl">Research that ships. Products that hold up.</h2>
            </div>
            <Link
              href="/work"
              className="hidden min-h-11 items-center gap-2 rounded-md border border-black/20 px-4 py-2 text-sm font-medium transition-colors hover:border-black hover:bg-black hover:text-white sm:inline-flex"
            >
              View all <BsArrowRight aria-hidden="true" />
            </Link>
          </div>
          {(selectedWork?.works || []).map((work) => (
            <WorkPreview key={work.title} work={work} />
          ))}
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
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-black/45">Public record</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Research and ideas in public.</h2>
            </div>
            <div className="flex gap-5 text-sm font-semibold">
              <Link href="/research" className="underline underline-offset-4">Research</Link>
              <Link href="/speaking" className="underline underline-offset-4">Speaking</Link>
            </div>
          </div>
          <div className="mt-9 grid gap-10 border-t border-black/15 pt-8 md:grid-cols-[1.25fr_0.75fr] md:gap-16">
            <div>
              <h3 className="text-sm font-semibold uppercase text-black/45">Research published</h3>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                {researchLinks.map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer noopener" className="text-sm font-medium underline decoration-black/20 underline-offset-4 hover:decoration-black md:text-base">
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase text-black/45">Speaking</h3>
              <p className="mt-4 max-w-[420px] text-sm leading-relaxed text-black/60 md:text-base">
                Selected talks and panels on AI-agent coordination, governance design, validators, privacy, and token economics.
              </p>
              <Link href="/speaking" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline decoration-black/20 underline-offset-4 hover:decoration-black">
                Browse speaking record <BsArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
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
