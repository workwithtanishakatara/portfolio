import WritingItem from "@/components/writing/WritingItem";
import { fetchData } from "@/lib/FetchData";
import { urlFor } from "@/lib/ImageUrl";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const page = async () => {
  const people = [
    {
      id: 1,
      link: "https://example.com",
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      link: "https://example.com",
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      link: "https://example.com",
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      link: "https://example.com",
      name: "Emily Davis",
      designation: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 5,
      link: "https://example.com",
      name: "Tyler Durden",
      designation: "Soap Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
    {
      id: 6,
      link: "https://example.com",
      name: "Dora",
      designation: "The Explorer",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    },
  ];

  const data = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22writingPage%22%5D%5B0%5D+%7B%0A+++ctaImage%2C%0A++++ctaHeading%2C%0A++++ctaText%2C%0A++++ctaButtonText%2C%0A++++ctaLink%2C%0A++articles%5B%5D+%7B%0A++++name%2C%0A++++link%2C%0A++++description%2C%0A++++image%2C%0A++++members%5B%5D+-%3E+%7B%0A++++++_id%2C%0A++++++name%2C%0A++++++designation%2C%0A++++++image%2C%0A++++++link%2C%0A++++++%2F%2F+Add+other+fields+from+the+member+schema+that+you+want+to+include%0A++++%7D%0A++%7D%0A%7D%0A"
  );

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="max-w-[1200px] w-full py-20 p-5 flex flex-col gap-20">
        <div className="flex flex-row justify-center gap-10 items-center flex-wrap">
          {data.articles.map((article, index) => (
            <WritingItem
              link={article.link}
              title={article.name}
              content={article.description}
              img={urlFor(article.image).url()}
              people={article.members}
            />
          ))}
        </div>
        <div className="w-full flex flex-col md:flex-row gap-5 justify-start items-center py-10">
          <div className="flex flex-col h-full w-full gap-4">
            <h1 className="font-semibold text-4xl">{data.ctaHeading}</h1>
            <PortableText value={data.ctaText} />
            <Link
              target="_blank"
              className="w-full md:w-fit flex flex-row gap-2 justify-center items-center h-fit px-4 py-2 border hover:bg-black hover:text-white transition-all duration-300 border-black rounded-full"
              href={data.ctaLink}
            >
              {data.ctaButtonText} <FaArrowRightLong />
            </Link>
          </div>
          <div>
            <Image
            width={400}
            height={400}
            loading="lazy"
              className="w-[800px] object-cover h-[300px] rounded-2xl"
              src={urlFor(data.ctaImage).url()}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
