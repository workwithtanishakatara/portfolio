import React from "react";
import { AnimatedTooltip } from "../ui/AnimatedToolTip";

const Team = ({ data }) => {
  return (
    <div className="pt-40 pb-20">
      <div className="flex flex-col justify-center items-center gap-10">
        <h1 className=" text-4xl md:text-6xl  font-semibold text-left md:text-center capitalize">
          {data.teamHeading}
        </h1>
        <p className="text-left md:text-center text-sm md:text-lg  max-w-[1000px] text-neutral-500 ">
          {data.description}
        </p>
        <div className="relative flex-wrap max-w-[800px] px-[30px] flex justify-center items-center flex-row">
          <AnimatedTooltip size={60} items={data.members} />
        </div>
      </div>
    </div>
  );
};

export default Team;
