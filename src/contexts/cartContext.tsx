// src/contexts/cartContext.ts
'use client'

import { createContext, useState, type ReactNode } from "react";
import type { Post as Product } from "@/app/types/info";

export interface CartItem extends Product {
  amount: number; // quantidade no carrinho
  total: number;  // subtotal (price * amount)
}

export interface CartContextData {
  cart: CartItem[];
  cartAmount: number;
  total: number;
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
  calculate: (items: CartItem[]) => void;
  final: (items: CartItem[]) => Promise<void>;
}

interface CartContextProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export default function CartProvider({ children }: CartContextProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  function addItem(item: Product) {
    const indexItem = cart.findIndex((e) => e.id === item.id);

    if (indexItem !== -1) {
      const updatedCart = [...cart];
      updatedCart[indexItem].amount += 1;
      updatedCart[indexItem].total = updatedCart[indexItem].amount * updatedCart[indexItem].price;
      setCart(updatedCart);
      calculate(updatedCart);
      return;
    }

    const newItem: CartItem = {
      ...item,
      amount: 1,
      total: item.price,
    };

    const newCart = [...cart, newItem];
    setCart(newCart);
    calculate(newCart);
  }

  function removeItem(item: Product) {
    const indexItem = cart.findIndex((e) => e.id === item.id);

    if (indexItem !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[indexItem].amount > 1) {
        updatedCart[indexItem].amount -= 1;
        updatedCart[indexItem].total = updatedCart[indexItem].amount * updatedCart[indexItem].price;
        setCart(updatedCart);
        calculate(updatedCart);
      } else {
        const filteredCart = cart.filter((e) => e.id !== item.id);
        setCart(filteredCart);
        calculate(filteredCart);
      }
    }
  }

  async function final(_: CartItem[]) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setCart([]);
        setTotal(0);
        resolve();
      }, 1500);
    });
  }

  function calculate(items: CartItem[]) {
    const totalCalc = items.reduce((acc, obj) => acc + obj.total, 0);
    setTotal(totalCalc);
  }

  return (
    <CartContext.Provider 
      value={{
        cart, 
        cartAmount: cart.length, 
        total, 
        addItem, 
        removeItem, 
        calculate, 
        final 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


