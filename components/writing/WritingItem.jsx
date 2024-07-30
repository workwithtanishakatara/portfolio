"use client"

import Link from "next/link";
import React from "react";
import { AnimatedTooltip } from "../ui/AnimatedToolTip";

const WritingItem = ({link = "https://notion.com",content, title="Article Title Here", people, img = "https://framerusercontent.com/images/kBTqp2ERVTUqDw8zt27dW7lmg.jpg"}) => {


  return (
    <div className="w-full flex flex-col md:flex-row gap-5 justify-start ">
      <img
        className="md:max-w-[200px] md:h-[160px] w-full max-h-[300px] object-cover rounded-2xl cursor-pointer"
        onClick={()=>window.open(link)}
        src={img}
        alt=""
      />
      <div className="flex flex-col justify-start items-start gap-3">
        <div className="flex md:flex-row flex-col-reverse justify-between w-full items-start md:items-center gap-2 md:gap-0">
            <div className="font-semibold text-2xl tracking-normal">{title}</div>
            <div className="flex flex-row ">
              {people && <AnimatedTooltip items={people} />}  
            </div>
        </div>
        <div>
          <p>
            {content}
          </p>
          <span><Link href={link} target="_blank" className="underline font-semibold">Read More</Link></span>
        </div>
      </div>
    </div>
  );
};

export default WritingItem;
