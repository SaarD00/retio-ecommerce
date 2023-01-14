import React, { createContext, useState } from "react";
import { Items } from "../typings";

interface CartContextType {
  cart?: Items[];
  addToCart: (item: Items) => void;
  removeFromCart: (item: Items) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartDefault: CartContextType = {
  cart: undefined,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalPrice: 0,
};

export const CartContext = createContext<CartContextType>(CartDefault);

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Items[]>([]);

  function addToCart(item: Items) {
    setCart([...cart, item]);
  }

  function removeFromCart(item: Items) {
    setCart(cart.filter((i) => i._id !== item._id));
  }

  function clearCart() {
    setCart([]);
  }

  function totalPrice() {
    return cart.reduce((total, item) => total + item.cost, 0);
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    totalPrice,
    clearCart,
  };
  return (
    <>
      {/* @ts-ignore */}
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    </>
  );
}
