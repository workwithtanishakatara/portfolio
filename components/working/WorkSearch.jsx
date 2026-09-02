"use client";

import React, { useEffect, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
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
import Image from "next/image";

const WorkSearch = ({ data }) => {
  const works = data?.works || [];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredWorks, setFilteredWorks] = useState(works);
  const [selectedTag, setSelectedTag] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWorks = filteredWorks.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

    categories.add("All");

    works.forEach((work) => {
      (work.group || []).forEach((group) => {
        if (group.name) categories.add(group.name);
      });
      (work.subGroup || []).forEach((subGroup) => {
        if (subGroup.name) subCategories.add(subGroup.name);
      });
    });

    const categoriesArray = Array.from(categories);
    const subCategoriesArray = Array.from(subCategories);

    // Ensure 'others' is at the end
    if (!categoriesArray.includes("Others")) {
      categoriesArray.push("Others");
    } else {
      categoriesArray.splice(categoriesArray.indexOf("Others"), 1);
      categoriesArray.push("Others");
    }

    setAllCategories(categoriesArray);
    setAllSubCategories(subCategoriesArray);
  }, [works]);

  useEffect(() => {
    // Filter works based on search and selected categories
    let filtered = works;

    if (search) {
      filtered = filtered.filter((work) =>
        work.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((work) => {
        const workCategories = (work.group || [])
          .map((g) => g.name)
          .concat((work.subGroup || []).map((sg) => sg.name));
        return selectedCategories.every((cat) => workCategories.includes(cat));
      });
    }

    // If a specific tag is selected, filter based on that tag
    if (selectedTag && selectedTag !== "All") {
      filtered = filtered.filter(
        (work) =>
          (work.group || []).some((g) => g.name === selectedTag) ||
          (work.subGroup || []).some((sg) => sg.name === selectedTag)
      );
    }

    setFilteredWorks(filtered);
    setCurrentPage(1); // <--- THIS IS THE FIX: Reset page to 1 on filter change
  }, [search, selectedCategories, selectedTag, works]);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-3xl font-semibold">
          Selected work across AI systems and blockchain infrastructure
        </p>
      </div>
      <div className="space-y-5">
        <p className="text-sm text-neutral-500 tracking-normal">AREAS OF FOCUS</p>
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
          {currentWorks.map((work, index) => (
            <Card key={index} work={work} />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(1)}
            className={`size-10 text-lg mx-1 rounded-xl  items-center justify-center text-center flex hover:bg-gray-100`}
          >
            <IoIosArrowBack />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`size-10 text-lg mx-1 rounded-xl ${
                currentPage === index + 1
                  ? "bg-black text-white"
                  : "bg-gray-100 border border-gray-300 text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`size-10 text-lg mx-1 rounded-xl  items-center justify-center text-center flex hover:bg-gray-100`}
          >
            <IoIosArrowForward />
          </button>
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
  const imageSrc = work.imageUrl || (work.image ? urlFor(work.image).url() : null);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-black/10 bg-white">
      {imageSrc && (
        <img
          className="aspect-[16/9] w-full border-b border-black/10 object-cover"
          src={imageSrc}
          alt=""
          loading="lazy"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold uppercase text-black/45">
          {(work.group || []).map((group, index) => (
            <span key={group._id || group.name || index}>{group.name}</span>
          ))}
          {(work.subGroup || []).map((subGroup, index) => (
            <span key={subGroup._id || subGroup.name || index}>{subGroup.name}</span>
          ))}
        </div>
        <h2 className="mt-3 text-xl font-semibold leading-tight">{work.title}</h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-black/60">
          {work.description}
        </p>
        {work?.link && (
          <Link
            target="_blank"
            rel="noreferrer noopener"
            href={work.link}
            className="mt-5 w-fit text-sm font-semibold underline decoration-black/25 underline-offset-4 hover:decoration-black"
          >
            Read more
          </Link>
        )}
      </div>
    </article>
  );
};

const Tags = ({ allCategories, selectedTag, setSelectedTag }) => {
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    if (allCategories.length > 0 && selectedTag === undefined) {
      setSelectedTag(allCategories[0]);
    }
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
