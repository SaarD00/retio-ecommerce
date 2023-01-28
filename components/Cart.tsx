import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { createSecretKey } from "crypto";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartContext } from "../context/context";
import { sanityClient } from "../sanity";
import { ItemBody, Items, User } from "../typings";

interface Props {
  setItems: Dispatch<SetStateAction<Items[]>>;
  user: User;
}

const Cart = ({ setItems, user }: Props) => {
  const router = useRouter();
  const { addToCart, cart, removeFromCart, totalPrice } =
    useContext(CartContext);
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [cost, setCost] = useState("");
  console.log(input);

  const postItem = async () => {
    const postInfo: ItemBody = {
      name: input,
      buyer: session?.user?.name || "Unknown",
      cost: cost || "0",
    };

    const result = await fetch(`/api/addOrder`, {
      body: JSON.stringify(postInfo),
      method: "POST",
    });

    const json = await result.json();

    return json;
  };
  // async function addOrderToUser() {
  //   if (session?.user?.name !== cart?.map((carts) => carts.name)) {
  //     return;
  //   }
  //   try {
  //     const updatedOrders = [
  //       ...user.orders,
  //       { _ref: cart?.map((carts) => carts._id) },
  //     ];
  //     await sanityClient
  //       .patch(user._id)
  //       .set({ orders: updatedOrders })
  //       .commit();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    const input = cart?.map((carts) => carts.name);
    const input2 = input?.toString();
    setInput(input2!);

    const cost = cart?.map((carts) => carts.cost! * carts.quantity!);
    const cost2 = cost?.toString();
    setCost(cost2!);
  }, [cart]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    postItem();
    // addOrderToUser();
  };

  return (
    <div className="flex flex-col max-w-7xl mx-auto p-5 overflow-x-hidden">
      {showModal ? (
        <div className="absolute flex z-50  w-full    justify-center  ">
          <div className="absolute bg-[#fafafad6] items-center  p-5  mr-64 shadow-lg shadow-black/20 rounded-lg z-50">
            <h1 className="text-2xl font-[490] gap-2 flex items-center justify-center p-5">
              Choose Your Delivery Option{" "}
              <span
                className="hover:text-Retio-secondary transition-all duration-200"
                onClick={() => setShowModal(false)}
              >
                <XMarkIcon className="w-5 h-5 " />
              </span>
            </h1>
            <div className="flex ">
              <div className="object-contain p-5 flex flex-col space-y-5 justify-center items-center w-full">
                <img
                  className=" object-cover w-48 rounded-lg"
                  src="https://m.economictimes.com/thumb/msid-83058184,width-1200,height-900,resizemode-4,imgsize-47252/cod-istock.jpg"
                />
                <p className="text-lg p-2 border rounded-full border-black/50 hover:bg-Retio-secondary transition-all duration-500  cursor-pointer hover:text-white hover:border-white/5">
                  Pay on Delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

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
                      <input
                        value={carts.name}
                        className="outline-none bg-none rounded-lg w-full"
                      />
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
                    ₹{carts.quantity! * carts.cost!}
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
        <div className="flex justify-between">
          {/* @ts-ignore */}
          <p className="text-sm font-medium">Total: ₹{totalPrice()}</p>
          <button
            onClick={handleSubmit}
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
