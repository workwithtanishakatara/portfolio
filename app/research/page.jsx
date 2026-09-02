import WritingItem from "@/components/writing/WritingItem";
import { fetchData } from "@/lib/FetchData";
import { urlFor } from "@/lib/ImageUrl";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export const metadata = {
  title: "Research",
  description:
    "Research and open-source work by Tanisha Katara across AI agents, LLM economics, governance, validators, and crypto-economic systems.",
};

const Page = async () => {
  const data = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22writingPage%22%5D%5B0%5D+%7B%0A+++ctaImage%2C%0A++++ctaHeading%2C%0A++++ctaText%2C%0A++++ctaButtonText%2C%0A++++ctaLink%2C%0A++articles%5B%5D+%7B%0A++++name%2C%0A++++link%2C%0A++++description%2C%0A++++image%2C%0A++++members%5B%5D+-%3E+%7B%0A++++++_id%2C%0A++++++name%2C%0A++++++designation%2C%0A++++++image%2C%0A++++++link%0A++++%7D%0A++%7D%0A%7D%0A",
  );

  return (
    <main className="flex flex-col items-center justify-center">
      <section className="w-full border-b border-black/10 bg-[#F4F7F6]">
        <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-5 py-12 md:grid-cols-[0.8fr_1.2fr] md:py-16">
          <div>
            <p className="text-sm font-semibold uppercase text-[#087F5B]">Open-source AI build</p>
            <h2 className="mt-3 text-4xl font-semibold">cacheeconomics</h2>
          </div>
          <div>
            <p className="max-w-[720px] text-xl font-medium leading-relaxed">
              A local Python tool for separating prompt-cache reads, writes, and fresh input spend, then turning the result into specific technical fixes.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://commodiverus388593.substack.com/p/cache-economics-how-to-stop-paying"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-black/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white"
              >
                Read the launch essay <FiExternalLink aria-hidden="true" />
              </a>
              <a
                href="https://github.com/Tanisha-Katara/cacheeconomics"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-black/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white"
              >
                View on GitHub <FiGithub aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="flex w-full max-w-[1200px] flex-col gap-20 px-5 py-16 md:py-24">
        <div className="flex flex-row flex-wrap items-center justify-center gap-10">
          {(data?.articles || []).map((article) => (
            <WritingItem
              key={article.name}
              link={article.link}
              title={article.name}
              content={article.description}
              img={urlFor(article.image).url()}
              people={article.members}
            />
          ))}
        </div>

        <div className="flex w-full flex-col items-center justify-start gap-8 border-t border-black/10 py-10 md:flex-row">
          <div className="flex h-full w-full flex-col gap-4">
            <h2 className="text-4xl font-semibold">{data.ctaHeading}</h2>
            <PortableText value={data.ctaText} />
            <Link
              target="_blank"
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-black px-4 py-2 transition-colors hover:bg-black hover:text-white md:w-fit"
              href={data.ctaLink}
            >
              {data.ctaButtonText} <FaArrowRightLong aria-hidden="true" />
            </Link>
          </div>
          <Image
            width={700}
            height={400}
            loading="lazy"
            className="h-[300px] w-full rounded-md object-cover md:max-w-[560px]"
            src={urlFor(data.ctaImage).url()}
            alt=""
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
