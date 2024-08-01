import Header from "@/components/speaking/Header";
import Marquee from "@/components/ui/InfiniteScroll";
import { LinkPreview } from "@/components/ui/LinkPreview";
import { fetchData } from "@/lib/FetchData";
import { urlFor } from "@/lib/ImageUrl";
import { PortableText } from "next-sanity";
import Link from "next/link";
import React from "react";

const page = async () => {
  const data = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22aboutPage%22%5D%5B0%5D%7B%0A++title%2C%0A++++sideText%2C%0A++++mainText%2C%0A++++gallery%0A%7D%0A"
  );

  const getImage = (url) => {
    switch(url){
      case "https://www.instagram.com/p/C7Mkvz2veEZ/?img_index=1":
        return {isStatic: true, src : "https://scontent.cdninstagram.com/v/t51.29350-15/445080863_701179285383242_6829720075000149364_n.heic?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=Kn90aHKAg4IQ7kNvgEM87zO&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzM3MjIzMTgzMTIzODYxOTA2MA%3D%3D.2-ccb7-5&oh=00_AYDUDtFD3QGKJRrKL6Ith962Z_WX6GMTRhoG-RCVGVT2ZA&oe=66ABD88E&_nc_sid=10d13b"}
        case "https://www.instagram.com/tv/CLsNgZFnZBi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==":
          return {isStatic: true, src : "/assets/img.jpeg"}
      default: 
        return {isStatic: false, src: false}
    }
  }

  return (
    <main className="flex flex-col  justify-center items-center">
      {/* <Header title="About" /> */}
      <div className="max-w-[1200px] w-full py-20 p-5">
        <div className="flex flex-col md:flex-row justify-between gap-10 items-start ">
          <div className="md:sticky md:top-0 w-full md:max-w-[500px] md:min-w-[500px]">
            <div className="text-xl md:text-2xl font-medium md:p-5">
              <PortableText
                components={{
                  marks: {
                    link: ({ children, value }) => (
                      <LinkPreview url={value.href}>{children}</LinkPreview>
                    ),
                  },
                }}
                value={data.mainText}
              />
            </div>
            <div className="relative">
              <Marquee className={`[--duration:40s]`}>
                {data.gallery.map((img, index)=>(
                  <img
                  key={index}
                  className="h-[300px] object-cover rounded-2xl"
                  src={urlFor(img).url()}
                />
                ))}
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
            </div>
            <div className="text-xl text-black/70 font-normal md:p-5">
            You can access Tanisha’s work by <Link className="text-black underline font-semibold " href={"/work"}>clicking here</Link>
            </div>
          </div>
          <div className="text-xl md:pr-3 scrollbar-track-transparent scrollbar-thumb-black/10 scrollbar-corner-red-600 !scrollbar-track-rounded-full !scrollbar-thumb-rounded-full !scrollbar-corner-rounded-full scrollbar-thin md:max-h-[600px] md:overflow-y-scroll text-black/70 flex flex-col gap-10 py-5 font-normal">
            <PortableText
              components={{
                marks: {
                  link: ({ children, value }) => (
                    <LinkPreview isStatic={getImage(value.href).isStatic} imageSrc={getImage(value.href).src} url={value.href}>{children}</LinkPreview>
                  ),
                },
              }}
              value={data.sideText}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
