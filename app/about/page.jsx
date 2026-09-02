import { fetchData } from "@/lib/FetchData";
import { urlFor } from "@/lib/ImageUrl";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export const metadata = {
  title: "About",
  description:
    "About Tanisha Katara's work across AI systems, blockchain infrastructure, product strategy, governance, and mechanism design.",
};

const Page = async () => {
  const data = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22aboutPage%22%5D%5B0%5D%7Bgallery%7D",
  );

  const gallery = data?.gallery?.slice(0, 3) || [];

  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <div>
            <p className="text-sm font-semibold uppercase text-[#087F5B]">The common thread</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Making complex technology useful, governable, and durable.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-black/65">
            <p>
              Tanisha Katara is the founder of Katara Consulting Group. She advises AI, blockchain, and digital-infrastructure teams where product decisions, engineering constraints, economic incentives, and customer needs meet.
            </p>
            <p>
              Her work ranges from product discovery and technical deployment to governance architecture, validator systems, privacy products, treasury design, and token economics. The goal is practical: identify structural weaknesses early, make trade-offs explicit, and build systems that still work under real participation and pressure.
            </p>
            <p>
              She has worked in long-term roles with Filecoin, Polygon, Avail, Mina, Aragon, Juno, and early-stage technology companies. Before specializing in decentralized infrastructure, she worked across fintech strategy, revenue analytics, and founder-led operations.
            </p>
          </div>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="border-y border-black/10 bg-[#F4F7F6]">
          <div className="mx-auto grid w-full max-w-[1200px] gap-4 px-5 py-10 sm:grid-cols-3 md:py-14">
            {gallery.map((image, index) => (
              <Image
                key={image._key || index}
                src={urlFor(image).width(900).height(700).url()}
                width={900}
                height={700}
                alt={`Tanisha Katara speaking and working, image ${index + 1}`}
                className="aspect-[4/3] w-full rounded-md object-cover"
              />
            ))}
          </div>
        </section>
      )}

      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
          <p className="text-sm font-semibold uppercase text-black/45">Current focus</p>
          <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
            <article className="border-t-4 border-[#087F5B] pt-6">
              <h2 className="text-3xl font-semibold">AI systems</h2>
              <p className="mt-4 leading-relaxed text-black/65">
                Tanisha researches and builds around agent coordination, identity and accountability, prompt-cache economics, evaluation logic, and technical workflows. Her public work includes the cacheeconomics Python package, an Ethereum governance agent, analysis of consensus across 500 Moltbook threads, and writing on identity infrastructure for autonomous agents.
              </p>
              <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold">
                <a
                  href="https://github.com/Tanisha-Katara/cacheeconomics"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 underline underline-offset-4"
                >
                  cacheeconomics <FiGithub aria-hidden="true" />
                </a>
                <a
                  href="https://commodiverus388593.substack.com/p/cache-economics-how-to-stop-paying"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 underline underline-offset-4"
                >
                  Launch essay <FiExternalLink aria-hidden="true" />
                </a>
              </div>
            </article>

            <article className="border-t-4 border-[#E03131] pt-6">
              <h2 className="text-3xl font-semibold">Blockchain infrastructure</h2>
              <p className="mt-4 leading-relaxed text-black/65">
                Her blockchain practice covers protocol governance, validator admission and reputation, staking, privacy, public-goods funding, treasury systems, and crypto-economic design. She combines empirical data, mechanism design, operating processes, and cross-functional delivery rather than treating governance as a document-only exercise.
              </p>
              <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold">
                <Link href="/work" className="inline-flex items-center gap-2 underline underline-offset-4">
                  Selected work <BsArrowRight aria-hidden="true" />
                </Link>
                <Link href="/research" className="inline-flex items-center gap-2 underline underline-offset-4">
                  Research <BsArrowRight aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="element border-t border-white/10">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-20">
          <p className="text-sm font-semibold uppercase text-[#63E6BE]">In public</p>
          <div>
            <p className="text-2xl font-medium leading-relaxed text-white md:text-3xl">
              Tanisha has spoken at EthCC, Devcon, Devconnect, ETH Tallinn, Paris Polkadot, Polygon Governance Hub, Blockchain Life, and other industry forums.
            </p>
            <Link
              href="/speaking"
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-md border border-white/50 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#132331]"
            >
              View speaking <BsArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
