import ContactForm from "@/components/contact/ContactForm";
import Marquee from "@/components/ui/InfiniteScroll";
import SparklesText from "@/components/ui/SparklingText";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/ToolTip";
import { fetchData } from "@/lib/FetchData";
import { urlFor } from "@/lib/ImageUrl";
import Link from "next/link";
import React from "react";
import { MdArrowOutward } from "react-icons/md";

const page = async () => {
  const data = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22contactPage%22%5D%5B0%5D"
  );

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="max-w-[1200px] flex-col flex justify-center items-center gap-10 w-full py-20 p-5">
        <ContactForm data={data} />
        <div className="py-20 w-full flex flex-col items-center justify-center">
          <div className="text-4xl flex flex-row justify-center gap-2 flex-wrap items-center w-full text-center font-semibold">
            <span className="">Public Whispers of</span>{" "}
            <SparklesText className={"text-4xl "} text={"Encouragement"} />
          </div>
          <div className="relative w-full mt-10">
            <Marquee pauseOnHover className={`[--duration:40s]`}>
              {data.testimonials.map((review, index) => (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <a
                        target="_blank"
                        href={review.link}
                        key={index}
                        className="w-[350px] cursor-pointer h-full justify-between flex flex-col gap-12 group p-5 hover:scale-105 transition-all duration-500 bg-slate-100 rounded-2xl"
                      >
                        <p className="text-sm text-left group-hover:text-neutral-800 transition-all duration-500 text-neutral-600 tracking-tight">
                          {review.review}
                        </p>
                        <div className="flex w-full flex-row items-center justify-between">
                          <div className="w-full flex flex-row gap-3 items-center justify-start">
                            <img
                              width={40}
                              height={40}
                              className="rounded-full"
                              src={urlFor(review.image).url()}
                            />
                            <div>
                              <p className="text-sm text-left text-neutral-600 tracking-tight">
                                {review.name}
                              </p>
                              <p className="text-sm text-left text-neutral-600 tracking-tight">
                                {review.description}
                              </p>
                            </div>
                          </div>
                          <MdArrowOutward />
                        </div>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div>
                        Click To Visit
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </Marquee>
            <div className="pointer-events-none opacity-0 md:opacity-100 absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none opacity-0 md:opacity-100 absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
