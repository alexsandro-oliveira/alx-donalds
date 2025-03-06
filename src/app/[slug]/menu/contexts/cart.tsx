"use client";

import { calculateTotalDiscount, calculateTotalPrice } from "@/helper/price";
import type { Product } from "@prisma/client";
import { createContext, useState, type ReactNode } from "react";

export interface CartProduct extends Product {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  total: number;
  subtotal: number;
  products: CartProduct[];
  totalQuantity: number;
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  total: 0,
  subtotal: 0,
  totalQuantity: 0,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  // Calculate the total price of the products in the cart
  const subtotal = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const total = products.reduce((acc, product) => {
    return acc + calculateTotalPrice(product) * product.quantity;
  }, 0);

  // Calculate the total quantity of the products in the cart
  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

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

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        // if the product is not the one we want to decrease, return it as it is
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        // if the quantity product is 1, don't decrease and return prevProduct
        if (prevProduct.quantity === 1) {
          return prevProduct;
        }
        return {
          ...prevProduct,
          quantity: prevProduct.quantity - 1,
        };
      });
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        return {
          ...prevProduct,
          quantity: prevProduct.quantity + 1,
        };
      });
    });
  };

  const removeProduct = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.filter((prevProduct) => prevProduct.id !== productId);
    });
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
        total,
        totalQuantity,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
