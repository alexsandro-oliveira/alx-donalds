"use client";

import type { Product } from "@prisma/client";
import { createContext, useState, type ReactNode } from "react";

interface CartProduct extends Pick<Product, "id" | "name" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  const toggleCart = () => setIsOpen((prev) => !prev);

  const addProduct = (product: CartProduct) => {
    // Check if the product is already in the cart
    const productIsAlreadyInCart = products.some(
      (prevProduct) => prevProduct.id === product.id,
    );
    // if the product is not in the cart, add it
    if (!productIsAlreadyInCart) {
      return setProducts((prev) => [...prev, product]);
    }
    // if else, check the product on the map and update the quantity
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        }
        return prevProduct;
      });
    });
  };

  return (
    <CartContext.Provider value={{ isOpen, products, toggleCart, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};
