import React, { MouseEventHandler, useContext, useState } from "react";
import { Stores as Store, Items } from "../typings";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { CartContext } from "../context/context";
interface Props {
  store: Store;
}

const StorePage = ({ store }: Props) => {
  // @ts-ignore
  const { addToCart, cart, removeFromCart, totalItems } =
    useContext(CartContext);
  console.log(cart);
  const useHover = (): [
    boolean,
    {
      onMouseEnter: MouseEventHandler<HTMLDivElement>;
      onMouseLeave: MouseEventHandler<HTMLDivElement>;
    }
  ] => {
    const [isHovered, setIsHovered] = useState(false);
    const onMouseEnter: MouseEventHandler<HTMLDivElement> = () =>
      setIsHovered(true);
    const onMouseLeave: MouseEventHandler<HTMLDivElement> = () =>
      setIsHovered(false);

    return [
      isHovered,
      {
        onMouseEnter,
        onMouseLeave,
      },
    ];
  };

  const [isHovered, hoverProps] = useHover();

  return (
    <div className="">
      <Header />

      <div key={store._id} className=" p-5  bg-Retio-secondary/10 ">
        <div className="max-w-7xl  mx-auto w-full flex gap-10 py-5 px-10">
          <img
            src={store.image}
            className="w-56 h-40 object-cover rounded-sm"
          />
          <div className="space-y-2">
            <h1 className="text-3xl text-black font-[350] mt-2">
              {store.name}
            </h1>
            <h2 className="text-black/90 font-[300]">
              {store.types.map((type) => (
                <p key={type._id}>{type.title}</p>
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
      <div className="max-w-7xl mx-auto  justify-between  px-10 py-5">
        <div className="  h-full border-l px-10">
          <p className="font-semibold text-lg">Recommended</p>
          <h1 className="font-[500] text-black/60">
            {store.items.length} ITEMS
          </h1>
          <div className="">
            {store.items.map((item) => (
              <div
                key={item._id}
                className="border-b   justify-between items-center flex p-10"
              >
                <div className="flex items-start gap-5">
                  <img className="w-36  p-1" src={item.image} />
                  <div className="flex flex-col">
                    <h1 className="font-[500] text-lg">{item.name}</h1>
                    <p className="font-[380] text-sm text-black/70">
                      {item.description}
                    </p>
                    {cart?.length! > 0 ? (
                      <>
                        <div
                          className="p-5 border border-Retio-secondary group w-32 flex cursor-pointer justify-center items-center hover:bg-Retio-secondary transition-all duration-500 ease-in-out mt-5 rounded-lg"
                          {...hoverProps}
                          // onClick={() => addToCart(item)}
                        >
                          <h2 className="group-hover:text-white transition-all duration-700 ease-in-out text-black">
                            {isHovered ? (
                              <div className="flex justify-between gap-5">
                                <ArrowUpIcon
                                  onClick={() => addToCart(item)}
                                  className="text-white/60 hover:text-white  rounded-full w-6 "
                                />
                                <ArrowDownIcon
                                  onClick={() => removeFromCart(item)}
                                  className="text-white/60 hover:text-white w-6"
                                />
                                <p></p>
                              </div>
                            ) : (
                              `₹${item.cost}`
                            )}
                          </h2>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="p-5 border border-Retio-secondary group w-32 flex cursor-pointer justify-center items-center hover:bg-Retio-secondary transition-all duration-500 ease-in-out mt-5 rounded-lg"
                          {...hoverProps}
                          onClick={() => addToCart(item)}
                        >
                          <h2 className="group-hover:text-white transition-all duration-700 ease-in-out text-black">
                            {isHovered ? "Add To Cart" : `₹${item.cost}`}
                          </h2>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
