import { useRouter } from "next/router";
import React, { useState } from "react";
import { Stores } from "../typings";

interface Props {
  stores: Stores[];
}

const Stores = ({ stores: storesProps }: Props) => {
  const router = useRouter();
  // Declare a state variable to keep track of which div is active

  const [store, setStore] = useState<Stores[]>(storesProps);

  const [activeTab, setActiveTab] = useState("relevance");
  const sortedStores: Stores[] = [...store].sort((a, b) => {
    if (activeTab === "relevance") {
      // No need to sort if the tab is "relevance"
      return 0;
    } else if (activeTab === "rating") {
      // Sort by rating in descending order
      return b.rating - a.rating;
    } else if (activeTab === "lowToHigh") {
      return b.discount - a.discount;
    } else {
      // If the tab is not recognized, return 0 (no sorting)
      return 0;
    }
  });

  // Function to handle clicks on the divs
  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-7xl p-5 mx-auto justify-center">
      {/* Header */}
      <div className="justify-between flex items-center border-b">
        <h1 className="text-3xl  md:font-semibold ">{store.length} stores</h1>
        <div className="flex gap-10 p-5">
          <div
            className={`${
              activeTab === "relevance"
                ? "underline underline-offset-8 !hover:text-black"
                : ""
            } cursor-pointer hover:text-black/70 `}
            onClick={() => handleClick("relevance")}
          >
            <h1>Relevance</h1>
          </div>
          <div
            className={`${
              activeTab === "rating" ? "underline  underline-offset-8" : ""
            } cursor-pointer hover:text-black/70`}
            onClick={() => handleClick("rating")}
          >
            <h1>Rating</h1>
          </div>
          <div
            className={`${
              activeTab === "lowToHigh" ? "underline underline-offset-8" : ""
            } cursor-pointer hover:text-black/70`}
            onClick={() => handleClick("lowToHigh")}
          >
            <h1 className="hidden md:flex">Low To High</h1>
            <h1 className="md:hidden">Lowest</h1>
          </div>
        </div>
      </div>
      {/* Stores */}
      <div className="p-5 flex gap-16  flex-wrap justify-center   ">
        {sortedStores.map((store) => (
          <div
            onClick={() => router.push(`/stores/${store.slug.current}`)}
            key={store._id}
            className="p-2  border rounded-lg  cursor-pointer hover:border-Retio-secondary/50 transition-all duration-200"
          >
            <div>
              <img
                loading="lazy"
                className="w-72 object-contain  rounded-lg  "
                src={store.image}
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold mt-3 px-1">{store.name}</h1>
              {store.types.map((type) => (
                <p key={type._id} className="text-sm font-light">
                  {type.title}
                </p>
              ))}
            </div>
            <div className="justify-between flex">
              <div className="flex justify-center items-center">
                <p className="text-xs font-light">
                  <span className="font-semibold underline underline-offset-2 gap-2">
                    {store.discount}%
                  </span>{" "}
                  discount on all products
                </p>
              </div>
              <p
                className={
                  store.rating >= 3
                    ? "bg-Retio-secondary rounded-lg px-3 py-1 text-white w-fit"
                    : "bg-red-500 rounded-lg px-3 py-1 text-white w-fit"
                }
              >
                <span>{store.rating}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stores;
