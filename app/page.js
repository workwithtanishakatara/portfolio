import MainHomePage, {
  MainHomePagePartTwo,
} from "@/components/home/MainHomePage";
import Marquee from "@/components/ui/InfiniteScroll";
import { LinkPreview } from "@/components/ui/LinkPreview";
import { fetchData } from "@/lib/FetchData";
import { PortableText } from "next-sanity";
import Image from "next/image";

const clients = [
  "Ethereum Gov AI",
  "Polygon",
  "Filecoin",
  "Avail",
  "Mina Foundation",
  "Aragon",
  "Liberdus",
  "DaoLens",
  "DaoCals",
  "Juno Finance",
  "instiX",
];

export default async function Home() {
  const data = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22homePage%22%5D%5B0%5D%0A",
  );

  const selectedWork = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22workingPage%22%5D%5B0%5D%7B%0A+works%5B0...3%5D%7B%0A++++title%2C%0A++++description%2C%0A++++link%2C%0A++++image%2C%0A++++%22group%22%3A+group%5B%5D-%3E%7B%0A++++++_id%2C%0A++++++name%2C%0A++++++%2F%2F+Add+other+fields+from+the+group+schema+that+you+need%0A++++%7D%2C%0A++++%22subGroup%22%3A+subGroup%5B%5D-%3E%7B%0A++++++_id%2C%0A++++++name%2C%0A++++++%2F%2F+Add+other+fields+from+the+subGroup+schema+that+you+need%0A++++%7D%0A++%7D%0A%7D%0A",
  );

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="relative w-full mt-10">
        <Marquee className={`[--duration:20s]`}>
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex flex-row justify-center items-center gap-10 mr-5"
            >
              <h1 className="text-4xl opacity-50 hover:opacity-100 transition-all duration-300 md:text-6xl font-semibold text-left md:text-center capitalize">
                {client}
              </h1>
              <div className="w-[20px] opacity-50 hover:opacity-100 transition-all duration-300 h-[20px] rotate-45 bg-black" />
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none opacity-0 md:opacity-100 absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none opacity-0 md:opacity-100 absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
      <div className="max-w-[1200px] w-full py-20 p-5">
        <MainHomePage data={data.cardSection} />
      </div>
      <div className="w-full flex flex-col justify-center items-center element">
        <div className="max-w-[1200px] w-full text-2xl space-y-5 text-neutral-500 font-medium tracking-tight py-40 p-5 ">
          {/* <TextRevealByWord text="Tanisha's a blockchain whiz who's worked with top companies. Now she's ready to help yours!" /> */}
          <div className="text-2xl md:pr-3 scrollbar-track-transparent scrollbar-thumb-black/10 scrollbar-corner-red-600 !scrollbar-track-rounded-full !scrollbar-thumb-rounded-full !scrollbar-corner-rounded-full scrollbar-thin md:max-h-[600px] md:overflow-y-scroll text-black/70 flex flex-col gap-10 py-5 font-normal">
            <PortableText
              components={{
                marks: {
                  link: ({ children, value }) => (
                    <LinkPreview url={value.href}>{children}</LinkPreview>
                  ),
                },
              }}
              value={data.text}
            />
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] w-full  p-5">
        <MainHomePagePartTwo selectedWork={selectedWork} data={data} />
      </div>
    </main>
  );
}
