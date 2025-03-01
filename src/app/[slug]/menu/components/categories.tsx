"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Prisma } from "@prisma/client";
import { useContext, useState } from "react";
import ProductList from "./product-list";
import { CartContext } from "../contexts/cart";
import { formatCurrency } from "@/helper/format-currency";
import CartSheet from "./cart-sheet";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: { menuCategories: { include: { products: true } } };
  }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0]);

  const { products, total, toggleCart, totalQuantity } =
    useContext(CartContext);

  const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };
  const getCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  };

  return (
    <div>
      <ScrollArea className="w-full">
        <div className="flex w-max space-x-4 p-4 pt-0">
          {restaurant.menuCategories.map((category) => (
            <Button
              key={category.id}
              variant={getCategoryButtonVariant(category)}
              className="rounded-full"
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
      <ProductList products={selectedCategory.products} />

      {products.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between border-t bg-white px-5 py-3 opacity-90">
          <div className="mx-auto flex w-full max-w-screen-xl justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Total dos pedidos</p>
              <p className="text-sm font-semibold">
                {formatCurrency(total)}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
                </span>
              </p>
            </div>
            <Button className="rounded-xl" onClick={toggleCart}>
              Ver Sacola
            </Button>
            <CartSheet />
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantCategories;
