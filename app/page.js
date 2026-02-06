import MainHomePage, {
  MainHomePagePartTwo,
} from "@/components/home/MainHomePage";
import { LinkPreview } from "@/components/ui/LinkPreview";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/ToolTip";
import { fetchData } from "@/lib/FetchData";
import { PortableText } from "next-sanity";
import Image from "next/image";

const Logos = [
  {
    url: "https://ethereum.org/",
    logo: "/assets/logos/ethereum.png",
    name: "Ethereum",
    imageAlt: "Ethereum Gov AI Agent logo",
  },
  {
    url: "https://polygon.technology/",
    logo: "/assets/logos/polygon.png",
    name: "Polygon",
    imageAlt: "Polygon logo",
  },
  {
    name: "Avail",
    url: "https://avail.io/",
    logo: "/assets/logos/avail.webp",
    imageAlt: "Avail logo",
  },
  {
    name: "Filecoin",
    url: "https://filecoin.io/",
    logo: "/assets/logos/filecoin.png",
    imageAlt: "Filecoin logo",
  },
  {
    name: "MINA",
    url: "https://minaprotocol.com/",
    logo: "/assets/logos/mina.png",
    imageAlt: "Mina logo",
  },
  {
    url: "https://aragon.org/",
    logo: "/assets/logos/Aragon.png",
    name: "Aragon",
    imageAlt: "Aragon logo",
  },
  {
    url: "https://www.junofinance.com/",
    logo: "/assets/logos/juno.png",
    name: "Juno",
    imageAlt: "Juno logo",
  },
  {
    url: "https://daolens.io/",
    logo: "/assets/logos/DaoLens.webp",
    name: "DaoLens",
    imageAlt: "DaoLens logo",
  },
  {
    name: "DaoCals",
    url: "https://www.linkedin.com/company/thetrackapp?trk=public_post-text",
    logo: "/assets/logos/daocals.png",
    imageAlt: "DaoCals logo",
  },
  {
    name: "InstiX",
    url: "https://instix.io/",
    logo: "/assets/logos/instix.jpg",
    imageAlt: "InstiX logo",
  },
  {
    name: "Liberdus",
    url: "https://liberdus.com/site/",
    logo: "/assets/logos/liberdus.jpg",
    imageAlt: "Liberdus logo",
  }
]

export default async function Home() {
  const data = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22homePage%22%5D%5B0%5D%0A",
  );

  const selectedWork = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22workingPage%22%5D%5B0%5D%7B%0A+works%5B0...3%5D%7B%0A++++title%2C%0A++++description%2C%0A++++link%2C%0A++++image%2C%0A++++%22group%22%3A+group%5B%5D-%3E%7B%0A++++++_id%2C%0A++++++name%2C%0A++++++%2F%2F+Add+other+fields+from+the+group+schema+that+you+need%0A++++%7D%2C%0A++++%22subGroup%22%3A+subGroup%5B%5D-%3E%7B%0A++++++_id%2C%0A++++++name%2C%0A++++++%2F%2F+Add+other+fields+from+the+subGroup+schema+that+you+need%0A++++%7D%0A++%7D%0A%7D%0A",
  );

  return (
    <TooltipProvider>
      <main className="flex flex-col justify-center items-center">
      <div className="max-w-[1200px] py-20">
        <h1 className="text-lg text-center md:text-xl font-medium">Trusted By</h1>
        <div className="flex flex-row mt-4 flex-wrap justify-center items-center gap-10">
        
      {Logos.map((logo, index)=> (
         <Tooltip key={index} delayDuration={0} >
          <TooltipTrigger>
            <a href={logo.url} target="_blank">
               <Image
            src={logo.logo}
            width={100}
            height={100}
            alt={logo.imageAlt}
            className="w-16  opacity-50 hover:opacity-100 transition-all duration-300"
          />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>{logo.name}</p>
          </TooltipContent>
         </Tooltip>
      ))}
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
    </TooltipProvider>
  );
}
