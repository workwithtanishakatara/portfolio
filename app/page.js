import MainHomePage, {
  MainHomePagePartTwo,
} from "@/components/home/MainHomePage";
import { LinkPreview } from "@/components/ui/LinkPreview";
import { fetchData } from "@/lib/FetchData";
import { PortableText } from "next-sanity";
import Image from "next/image";

export default async function Home() {
  const data = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22homePage%22%5D%5B0%5D%0A",
  );

  const selectedWork = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22workingPage%22%5D%5B0%5D%7B%0A+works%5B0...3%5D%7B%0A++++title%2C%0A++++description%2C%0A++++link%2C%0A++++image%2C%0A++++%22group%22%3A+group%5B%5D-%3E%7B%0A++++++_id%2C%0A++++++name%2C%0A++++++%2F%2F+Add+other+fields+from+the+group+schema+that+you+need%0A++++%7D%2C%0A++++%22subGroup%22%3A+subGroup%5B%5D-%3E%7B%0A++++++_id%2C%0A++++++name%2C%0A++++++%2F%2F+Add+other+fields+from+the+subGroup+schema+that+you+need%0A++++%7D%0A++%7D%0A%7D%0A",
  );

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="max-w-[1200px] py-20">
        <h1 className="text-lg text-center md:text-xl font-medium">Trusted By</h1>
        <div className="flex flex-row mt-4 flex-wrap justify-center items-center gap-10">
          <Image
            src={"/assets/logos/Aragon.png"}
            width={100}
            height={100}
            alt="client"
            className="grayscale w-16 hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
          />
          <Image
            src={"/assets/logos/DaoLens.webp"}
            width={100}
            height={100}
            alt="client"
            className="grayscale w-16 hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
          />
          <Image
            src={"/assets/logos/ethereum.png"}
            width={100}
            height={100}
            alt="client"
            className="grayscale w-16 hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
          />
          <Image
            src={"/assets/logos/avail.webp"}
            width={100}
            height={100}
            alt="client"
            className="grayscale w-16 hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
          />
          <Image
            src={"/assets/logos/filecoin.png"}
            width={100}
            height={100}
            alt="client"
            className="grayscale w-16 hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
          />
          <Image
            src={"/assets/logos/Juno.png"}
            width={100}
            height={100}
            alt="client"
            className="grayscale w-16 hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
          />
          <Image
            src={"/assets/logos/Liberdus.png"}
            width={100}
            height={100}
            alt="client"
            className="grayscale w-16 hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
          />
          <Image
            src={"/assets/logos/mina.png"}
            width={100}
            height={100}
            alt="client"
            className="grayscale w-16 hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
          />
          <Image
            src={"/assets/logos/polygon.png"}
            width={100}
            height={100}
            alt="client"
            className="grayscale w-16 hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
          />
        </div>
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
