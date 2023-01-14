import logo from "../public/logo.png";
import Image from "next/image";
import { withRouter, NextRouter, useRouter } from "next/router";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  FolderPlusIcon,
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut } from "next-auth/react";
import React, { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { Items } from "../typings";
import { useSelector } from "react-redux";
import { CartContext } from "../context/context";

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const Header = () => {
  const { addToCart, cart, removeFromCart } = useContext(CartContext);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [town, setTown] = useState("");
  const router = useRouter();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      // Convert latitude and longitude to address
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=pk.eyJ1Ijoic2FhcmQwMCIsImEiOiJja3p6NnJkZ2IwNnZvM2luYWtmNXlzZWk3In0.dYNq0jh-AsMUfoCYT2Mgkg`
      )
        .then((response) => response.json())
        .then((data) => {
          // Extract and format address from geocoding data
          const address = data.features[0].place_name;
          setAddress(address);
        })
        .catch((error) => {
          setError(error);
        });
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?types=place&access_token=pk.eyJ1Ijoic2FhcmQwMCIsImEiOiJja3p6NnJkZ2IwNnZvM2luYWtmNXlzZWk3In0.dYNq0jh-AsMUfoCYT2Mgkg`
      )
        .then((response) => response.json())
        .then((data) => {
          // Extract and format town name from geocoding data
          const town = data.features[0].text;
          setTown(town);
        })
        .catch((error) => {
          setError(error);
        });
    });
  }, []);
  const { data: session } = useSession();

  const carthasitem = false;
  return (
    <div
      className="bg-white flex justify-between border-b sticky top-0 
     max-w-7xl mx-auto p-5 overflow-hidden"
    >
      {/* FIRST */}
      <div className="flex justify-center items-center gap-10 py-2 ">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <Image quality={100} width={150} height={50} src={logo} alt="Logo" />
        </div>
        <div className=" gap-2 cursor-pointer hidden md:flex justify-center items-center">
          <h1 className="font-bold space-x-3 text-sm group flex justify-center items-center  ">
            <span className="underline-offset-[7px] group-hover:text-Retio-secondary underline text-Retio-primary">
              {town}
            </span>
            <span className="font-[350] group-hover:text-Retio-primary/60">
              {address.slice(0, 33)}
            </span>
          </h1>
          <ChevronDownIcon className="text-Retio-secondary  w-5" />
        </div>
      </div>
      {/* Sdcond */}
      <div className="flex justify-center items-center font-semibold md:gap-14 gap-2 py-2">
        <div
          onClick={() => {
            router.push("/search");
          }}
          className="flex gap-1 md:gap-4 text-Retio-primary pl-3 md:px-0  group"
        >
          <MagnifyingGlassIcon className="text-Retio-primary md:w-5 w-3 hidden md:inline group-hover:text-green-400 font-semibold" />
          <h1 className="group-hover:text-Retio-secondary group-hover:cursor-pointer">
            Search
          </h1>
        </div>
        <div className=" gap-4 text-Retio-primary hidden md:flex  group">
          <FolderPlusIcon className="text-Retio-primary w-5  group-hover:text-green-400 font-semibold" />
          <h1 className="group-hover:text-Retio-secondary group-hover:cursor-pointer">
            Add Store
          </h1>
        </div>
        <div
          onClick={() => (session ? null : signIn())}
          className="flex gap-2 md:gap-4 text-Retio-primary  group"
        >
          {session ? (
            <UserIcon className="text-Retio-primary w-5 hidden md:inline  group-hover:text-green-400 font-semibold" />
          ) : (
            <UserIcon className="text-Retio-primary w-5 hidden md:inline  group-hover:text-green-400 font-semibold" />
          )}

          <h1 className="group-hover:text-Retio-secondary  group-hover:cursor-pointer">
            {session ? session?.user?.name : "Sign Up"}
          </h1>
        </div>
        <div
          onClick={() => router.push("/cart/cart")}
          className="flex md:gap-4 gap-1 text-Retio-primary  group"
        >
          {carthasitem ? (
            <>
              <ShoppingCartIcon className=" w-2 md:w-5  text-red-500 font-semibold" />
              <h1 className="text-red-500 group-hover:cursor-pointer">Cart</h1>
            </>
          ) : (
            <>
              <ShoppingCartIcon className="text-Retio-primary w-5 hidden md:inline group-hover:text-green-400 font-semibold" />
              <p className="absolute group-hover:text-Retio-secondary group-hover:cursor-pointer -mt-4 mx-3 px-1 ">
                {cart?.length}
              </p>
              <h1 className="group-hover:text-Retio-secondary group-hover:cursor-pointer">
                Cart
              </h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
