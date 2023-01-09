import Link from "next/link";
import React, { useState } from "react";
import { Category, Stores } from "../typings";
interface Props {
  category: Category[];
  stores: Stores[];
  onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}
const SearchBar = ({
  category,
  stores,
  onSearchInputChange,
  searchQuery,
}: Props) => {
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="flex justify-center items-center   p-5">
        <input
          onChange={onSearchInputChange}
          className="border border-black/20 rounded-lg placeholder:font-semibold  w-[70%] p-3 py-2 outline-none"
          placeholder="Search for retail stores"
        />
        {/* Results */}
      </div>
      <div className="flex   flex-col justify-start items-center   px-10 py-3">
        <h1 className="border-b border-black/20 mb-10">Results</h1>
        {searchQuery.length >= 3 &&
          stores.map((store) => (
            <Link
              className="flex   justify-start w-full"
              href={`/stores/${store.slug.current}`}
              key={store._id}
            >
              <div className="flex  justify-start hover:bg-Retio-secondary/10 hover:cursor-pointer rounded-lg p-2 py-5 w-full">
                <div className="flex space-x-5">
                  <img
                    src={store.image}
                    className="w-16 object-contain rounded-lg"
                  />
                  <div>
                    <h1 className="font-[380]">{store.name}</h1>
                    {store.types.map((type) => (
                      <p key={type._id} className="font-[200] text-sm">
                        {type.title}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
