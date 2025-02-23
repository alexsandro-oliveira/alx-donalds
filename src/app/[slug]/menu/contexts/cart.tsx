"use client";

import type { Product } from "@prisma/client";
import { createContext, useState, type ReactNode } from "react";

interface CartProduct extends Product {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  const toggleCart = () => setIsOpen((prev) => !prev);

  return (
    <CartContext.Provider value={{ isOpen, products, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};
