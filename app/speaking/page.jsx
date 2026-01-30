
import SpeakingVideoItem from "@/components/speaking/SpeakingVideoItem";
import { fetchData } from "@/lib/FetchData";
import React from "react";

const page = async () => {
  // TODO: fetch data from sanity and display it here

  const data = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22speakPage%22%5D%5B0%5D"
  );

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="max-w-[1200px] w-full py-20 p-5">
        <div className="flex flex-row justify-center gap-5 items-center flex-wrap">
          {data?.speakingEvents.map((event, index) => (
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
    </main>
  );
};

export default page;
