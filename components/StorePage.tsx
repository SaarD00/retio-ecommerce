import React from "react";
import { Stores as Store } from "../typings";
import { StarIcon } from "@heroicons/react/24/outline";
interface Props {
  store: Store;
}

const StorePage = ({ store }: Props) => {
  return (
    <div className=" p-5 bg-Retio-secondary/10 ">
      <div className="max-w-7xl  mx-auto w-full flex gap-10 py-5 px-10">
        <img src={store.image} className="w-56 h-40 object-cover rounded-sm" />
        <div className="space-y-2">
          <h1 className="text-3xl text-black font-[350] mt-2">{store.name}</h1>
          <h2 className="text-black/90 font-[300]">
            {store.types.map((type) => (
              <h2>{type.title}</h2>
            ))}
          </h2>
          <h3 className="text-black/90 font-[300]">{store.address}</h3>
          <div>
            <h4 className="text-black font-[500] flex gap-2">
              <StarIcon className="w-5" />
              {store.rating}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
