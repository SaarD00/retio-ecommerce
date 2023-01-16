import React, { createContext, useState } from "react";
import { Items } from "../typings";

interface CartContextType {
  cart?: Items[];
  addToCart: (item: Items) => void;
  removeFromCart: (item: Items) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
}

const CartDefault: CartContextType = {
  cart: undefined,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalPrice: 0,
  totalItems: 0,
};

export const CartContext = createContext<CartContextType>(CartDefault);

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Items[]>([]);
  const [items, setItems] = useState<Items[]>([]);

  function addToCart(item: Items) {
    // check if the item is already in the cart
    const existingItem = cart.find((i) => i._id === item._id);
    if (existingItem) {
      // if the item is already in the cart, increase the quantity by 1
      setCart(
        cart.map((i) =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + 1 } || {
                ...i,
                quantity: item.quantity + 1,
              }
            : i
        )
      );
    } else {
      // if the item is not in the cart, add it with quantity = 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  }

  function removeFromCart(item: Items) {
    const existingItem = cart.find((i) => i._id === i._id);
    if (existingItem && existingItem.quantity > 1) {
      // if the item is already in the cart and the quantity is more than 1, decrease the quantity by 1
      setCart(
        cart.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    } else {
      // if the item is not in the cart or the quantity is 1, remove it completely from the cart
      setCart(cart.filter((i) => i._id !== item._id));
    }
  }

  function clearCart() {
    setCart([]);
  }
  function totalPrice() {
    return cart.reduce((total, item) => total + item.quantity * item.cost, 0);
  }

  function totalItems() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    totalPrice,
    clearCart,
    totalItems,
  };
  return (
    <>
      {/* @ts-ignore */}
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    </>
  );
}
