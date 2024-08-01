import { urlFor } from "@/lib/ImageUrl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const CardSections = ({ data }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 items-center">
      {data.map((card, index) => (
        <CustomCard
          key={index}
          title={card.title}
          description={card.description}
          link={card.link}
          img={card.image}
        />
      ))}
    </div>
  );
};

export default CardSections;

export const CustomCard = ({ title, description, link = "/", img }) => (
  <Link
    href={link}
    className="flex group flex-col w-full items-start justify-start gap-3 cursor-pointer"
  >
    <div className="max-h-[450px] w-full overflow-hidden h-full rounded-2xl">
      {img && (
        <Image
        width={400}
        height={400}
        loading="lazy"
          className="w-full transition-all duration-300 group-hover:scale-105 object-cover h-[250px] lg:h-[450px] rounded-2xl"
          src={urlFor(img).url()}
        />
      )}
    </div>
    <div className="w-full flex flex-row justify-between items-center">
      <div>
        <p className="text-lg font-medium">{title}</p>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
      <div>
        <span className="w-full md:w-fit flex flex-row gap-2 justify-center items-center h-fit px-4 py-2 border group-hover:bg-black group-hover:text-white transition-all duration-300 border-black rounded-full">
          <BsArrowRight size={20} />
        </span>
      </div>
    </div>
  </Link>
);
