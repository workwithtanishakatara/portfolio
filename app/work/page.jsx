import Icon from "@/components/GraphSvg";
import Header from "@/components/speaking/Header";
import SpeakingVideoItem from "@/components/speaking/SpeakingVideoItem";
import Marquee from "@/components/ui/InfiniteScroll";
import { LinkPreview } from "@/components/ui/LinkPreview";
import Team from "@/components/working/Team";
import WorkSearch from "@/components/working/WorkSearch";
import { fetchData } from "@/lib/FetchData";
import { urlFor } from "@/lib/ImageUrl";
import { PortableText } from "next-sanity";
import React from "react";

const page = async () => {
  const data = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22workingPage%22%5D%5B0%5D%7B%0A++title%2C%0A++workText%2C%0A++works%5B%5D%7B%0A++++title%2C%0A++++description%2C%0A++++link%2C%0A++++%22imageUrl%22%3A+image.asset-%3Eurl%2C%0A++++group%5B%5D-%3E%7B%0A++++++name%2C++%2F%2F+Include+fields+from+the+%27group%27+schema+as+needed%0A++++++%2F%2F+Add+other+fields+you+want+to+retrieve+from+%27group%27%0A++++%7D%2C%0A++++subGroup%5B%5D-%3E%7B%0A++++++name%2C++%2F%2F+Fetching+the+%27name%27+field+from+%27subGroup%27%0A++++++%2F%2F+Add+other+fields+you+want+to+retrieve+from+%27subGroup%27%0A++++%7D%0A++%7D%2C%0A++teamHeading%2C%0A++description%2C%0A++%22members%22%3A+members%5B%5D-%3E%7B%0A++++_id%2C%0A++++name%2C%0A++++image%2C%0A++++designation%2C%0A++++link%0A++%7D%2C%0A++++additionalWorkTitle%2C%0A++++additionalWork%0A++++%0A%7D%0A"
  );

  return (
    <main className="flex flex-col   justify-center items-center">
      <div className="max-w-[1200px] overflow-x-hidden w-full py-20 p-5">
        <WorkSearch data={data} />
        <Team data={data} />
        <div className="pt-20 w-full pb-20">
          <div className="flex flex-col justify-center items-center gap-14">
            <h1 className=" text-4xl md:text-6xl  font-semibold text-left md:text-center capitalize">
              {data.additionalWorkTitle}
            </h1>
            {/* <p className="text-left md:text-center text-sm md:text-lg  max-w-[1000px] text-neutral-500 ">
          {data.add}
        </p> */}
            <div className="flex flex-row justify-center gap-5 items-center flex-wrap">
              {data?.additionalWork.map((event, index) => (
                <SpeakingVideoItem
                  key={index}
                  link={event.link}
                  description={event.description}
                  title={event.name}
                  img={event.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
