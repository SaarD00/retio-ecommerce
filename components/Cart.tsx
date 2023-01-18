import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { createSecretKey } from "crypto";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { CartContext } from "../context/context";

const Cart = () => {
  const router = useRouter();
  const { addToCart, cart, removeFromCart, totalPrice } =
    useContext(CartContext);
  const { data: session } = useSession();

  return (
    <div className="flex flex-col max-w-7xl mx-auto p-5">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Shopping Cart</h2>
        <div className="mb-4">
          {cart?.map((carts) => (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="text-sm flex justify-start font-medium leading-none w-fit p-5 text-gray-600">
                    Description
                  </th>
                  <th className="text-sm font-medium leading-none p-2 w-fit text-gray-600">
                    Quantity
                  </th>
                  <th className="text-sm font-medium leading-none p-2 w-fit text-gray-600">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 w-[60%] border-t border-gray-200">
                    <div className="flex gap-5">
                      <img
                        src={carts.image}
                        className="w-20 border border-black/5 p-2"
                      />
                      <h1>{carts.name}</h1>
                    </div>
                  </td>
                  <td className="p-2 w-fit border-t border-gray-200">
                    <div className="bg-white/60 flex py-1 w-fit">
                      <div
                        onClick={() => addToCart(carts)}
                        className="border p-2 hover:bg-Retio-secondary group transition-all duration-200 cursor-pointer"
                      >
                        <PlusIcon className="text-black w-6 group-hover:text-white transition-all duration-500" />
                      </div>
                      <div className="border p-2 px-4">{carts.quantity}</div>
                      <div
                        onClick={() => {
                          removeFromCart(carts);
                        }}
                        className="border p-2 items-center flex bg-black/5 cursor-pointer hover:bg-Retio-secondary transition-all duration-200 group"
                      >
                        <MinusIcon className="text-black w-5 group-hover:text-white transition-all duration-500" />
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border-t border-gray-200">
                    ₹{carts.quantity * carts.cost}
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
        <div className="flex justify-between">
          {/* @ts-ignore */}
          <p className="text-sm font-medium">Total: {totalPrice()}</p>
          <button
            onClick={() => router.push("/checkout/payondelivery")}
            className="bg-Retio-secondary/20 text-black hover:bg-Retio-secondary hover:text-white transition-all duration-200 py-2 px-4 rounded-lg"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
