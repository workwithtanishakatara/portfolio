"use client";

import React, { useEffect, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { RiAlarmWarningFill } from "react-icons/ri";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropDown";
import { urlFor } from "@/lib/ImageUrl";

const WorkSearch = ({ data }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [selectedTag, setSelectedTag] = useState();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedCategories((prev) => {
        if (!prev.includes(name)) {
          return [...prev, name];
        }
        return prev;
      });
    } else {
      setSelectedCategories((prev) =>
        prev.filter((category) => category !== name)
      );
    }
  };

  const handleTagRemove = (tag) => {
    setSelectedCategories((prev) =>
      prev.filter((category) => category !== tag)
    );
  };

  useEffect(() => {
    // Extract group and subGroup names
    const categories = new Set();
    const subCategories = new Set();

    data.works.forEach((work) => {
      work.group.forEach((group) => {
        if (group.name) categories.add(group.name);
      });
      work.subGroup.forEach((subGroup) => {
        if (subGroup.name) subCategories.add(subGroup.name);
      });
    });

    const categoriesArray = Array.from(categories);
    const subCategoriesArray = Array.from(subCategories);

    // Ensure 'others' is at the end
    if (!categoriesArray.includes('Others')) {
      categoriesArray.push('Others');
    } else {
      categoriesArray.splice(categoriesArray.indexOf('Others'), 1);
      categoriesArray.push('Others');
    }

    setAllCategories(categoriesArray);
    setAllSubCategories(subCategoriesArray);
  }, [data]);

  useEffect(() => {
    // Filter works based on search and selected categories
    let filtered = data.works;

    if (search) {
      filtered = filtered.filter((work) =>
        work.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((work) => {
        const workCategories = work.group
          .map((g) => g.name)
          .concat(work.subGroup.map((sg) => sg.name));
        return selectedCategories.every((cat) => workCategories.includes(cat));
      });
    }

    // If a specific tag is selected, filter based on that tag
    if (selectedTag) {
      filtered = filtered.filter(
        (work) =>
          work.group.some((g) => g.name === selectedTag) ||
          work.subGroup.some((sg) => sg.name === selectedTag)
      );
    }

    setFilteredWorks(filtered);
  }, [search, selectedCategories, selectedTag, data.works]);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-3xl font-semibold">{data.workText}</p>
      </div>
      <div className="space-y-5">
        <Tags
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          allCategories={allCategories}
        />
        <div className="flex w-full flex-wrap flex-row gap-5 items-center">
          <Search search={search} setSearch={setSearch} />
          <DropdownMenu className="z-50">
            <DropdownMenuTrigger className="z-50 w-full max-w-[300px]">
              <Categories />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50 p-5 bg-slate-50 min-w-[360px]">
              <div className="flex flex-col gap-2">
                {allSubCategories.map((category, index) => (
                  <label className="text-lg" key={index}>
                    <input
                      className="mr-1 size-4"
                      type="checkbox"
                      name={category}
                      checked={selectedCategories.includes(category)}
                      onChange={handleCheckboxChange}
                    />
                    {category}
                  </label>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <hr />
        <div className="flex flex-row gap-3 items-center">
          <p className="text-sm font-medium">{filteredWorks.length} Results</p>
          <div className="space-x-2 flex flex-row">
            {selectedCategories.map((tag, index) => (
              <span
                key={index}
                className="bg-neutral-100 px-3 gap-1 py-1.5 flex flex-row justify-center items-center cursor-pointer rounded-full text-xs"
                onClick={() => handleTagRemove(tag)}
              >
                {tag}
                <IoClose />
              </span>
            ))}
          </div>
        </div>
      </div>
      {filteredWorks.length !== 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3  relative !h-full w-full gap-5 grid-cols-1 ">
          {filteredWorks.map((work, index) => (
            <Card key={index} work={work} />
          ))}
        </div>
      )}
      {filteredWorks.length === 0 && (
        <NotFound404 selectedCategories={selectedCategories} search={search} />
      )}
    </div>
  );
};

export default WorkSearch;

export const Card = ({ work }) => {
  return (
    <div className="group h-[450px] w-full [perspective:1000px] ">
      <div className="relative h-full w-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* card front */}
        <div className="absolute cursor-pointer bg-neutral-100 rounded-2xl inset-0 flex justify-center items-center p-5">
          <div className="flex flex-col justify-center items-center gap-2 ">
            <div className="size-32  flex  justify-center items-center">
              <img
                className="w-full  object-cover"
                src={work.imageUrl || urlFor(work.image).url()}
                alt=""
              />
            </div>
            <h1 className="text-xl text-center font-semibold select-none">
              {work.title}
            </h1>
            <div className="flex flex-row justify-center items-center gap-2">
              {work.group.map((group, index) => (
                <p
                  key={index}
                  className="py-1 select-none px-1.5 bg-black rounded-lg text-white text-sm"
                >
                  {group.name}
                </p>
              ))}
            </div>
            <div className="flex w-full flex-wrap flex-row justify-center items-center gap-2">
              {work.subGroup.map((subGroup, index) => (
                <p
                  key={index}
                  className="py-1 select-none px-1.5 bg-white rounded-lg text-black text-sm"
                >
                  {subGroup.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        {/* card back  */}
        <div className="absolute cursor-pointer inset-0 h-full w-full rounded-xl bg-gradient-to-b from-slate-100 to-violet-600 p-7 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex  min-h-full gap-2 flex-col items-start justify-center">
            <p className="text-base select-none pt-10 tracking-normal leading-tight text-left">
              {work.description}
            </p>
            {work?.link && (
              <Link
                target="_blank"
                href={work.link}
                className="font-bold select-none underline"
              >
                Read more
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Tags = ({ allCategories, selectedTag, setSelectedTag }) => {
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    setSelectedTag(allCategories[0]);
  }, [allCategories]);

  return (
    <div className="flex w-full flex-wrap flex-row gap-3 md:gap-5 justify-start items-center">
      {allCategories.map((name) => (
        <Tag
          key={name}
          name={name}
          isSelected={selectedTag === name}
          onClick={() => handleTagClick(name)}
        />
      ))}
    </div>
  );
};

const Tag = ({ name, isSelected, onClick }) => {
  return (
    <div
      className={`py-1.5 px-3 cursor-pointer border rounded-lg ${
        isSelected ? "bg-black text-white" : "bg-slate-100/50 border-slate-200"
      }`}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

const Search = ({ setSearch, search }) => {
  return (
    <div className="border flex flex-row items-center justify-center gap-3 rounded-full py-2.5 px-4 bg-slate-100/50 border-slate-200">
      <IoSearch size={20} />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="bg-slate-100/50 w-full max-w-[300px] focus:!outline-none"
      />
    </div>
  );
};

const Categories = () => {
  return (
    <div className="relative w-full">
      <div className="border w-full cursor-pointer flex flex-row items-center justify-center gap-3 rounded-full py-2.5 px-4 bg-slate-100/50 border-slate-200">
        <p className=" w-full max-w-[300px] text-neutral-400 text-left">
          Work streams{" "}
        </p>
        <IoIosArrowDown size={20} />
      </div>
    </div>
  );
};

const NotFound404 = ({ search, selectedCategories }) => {
  return (
    <div className="bg-slate-100/80 rounded-2xl w-full h-full p-5 py-20 flex flex-col justify-center items-center">
      <RiAlarmWarningFill size={50} />
      <p>No results {search ? `for "${search}"` : `found`}</p>
      <p className="text-sm text-neutral-500">
        Sorry, we couldn't find anything with this criteria. Please try refining
        your search filters.
      </p>
    </div>
  );
};
