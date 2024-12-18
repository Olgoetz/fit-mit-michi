"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString().toLocaleLowerCase()}`);
  }
  return (
    <div className="flex mx-auto max-w-[500px] p-4 items-center rounded-lg border focus:ring-0 ">
      <SearchIcon className="text-gray-400 size-6 mr-4" />
      <input
        type="text"
        placeholder="z.B. Yoga, Moblity oder Workout"
        className="h-auto outline-none flex-1"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
};

export default SearchBar;
