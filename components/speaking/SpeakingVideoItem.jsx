"use client";

import { urlFor } from "@/lib/ImageUrl";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { CiPlay1 } from "react-icons/ci";

const SpeakingVideoItem = ({
  link = "https://youtube.com",
  description = "Adam breaks down the key indicators of languishing and presents three ways to escape that feeling and start finding your flow",
   title = "No Title",
   img = null
}) => {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => window.open(link)}
      className="relative overflow-hidden rounded-2xl"
    >
      <motion.img
        // animate={{ scale: hover ? 1.05 : 1 }}
        transition={{ type: "smooth", ease: "easeOut" }}
        className="w-[500px] h-[220px] md:h-[300px] object-cover "
        src={urlFor(img).url()}
      />
      <div className="absolute p-3 md:p-5 bg-gradient-to-t from-black hover:opacity-100 md:opacity-0 opacity-100 transition-all duration-300 cursor-pointer flex flex-col justify-between items-start text-white top-0 w-full h-full">
        <div className="text-3xl md:text-5xl">
          <CiPlay1 />
        </div>
        <div>
        <p className="text-sm md:text-base font-semibold">
            {title}
          </p>
          <p className="text-sm md:text-base">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SpeakingVideoItem;
