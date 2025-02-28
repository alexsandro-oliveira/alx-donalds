"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Prisma } from "@prisma/client";
import { ClockIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import ProductList from "./product-list";
import { CartContext } from "../contexts/cart";
import { formatCurrency } from "@/helper/format-currency";
import CartSheet from "./cart-sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RatingStarDialog from "./rating-dialog";

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
    <div className="relative z-50 mx-auto mt-[-1.5rem] max-w-screen-lg rounded-t-3xl border bg-white">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={restaurant.avatarImageUrl}
              alt={restaurant.name}
              width={45}
              height={45}
            />
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">{restaurant.name}</h1>
              <p className="text-xs text-muted-foreground">
                {restaurant.description}
              </p>
            </div>
          </div>

          <Dialog>
            <DialogTrigger>
              <Button variant="outline" className="gap-2 rounded-full">
                <StarIcon size={16} color="#FFB100" fill="#FFB100" />
                <span className="text-xs font-medium">5.0</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[80%] rounded-3xl">
              <RatingStarDialog restaurant={restaurant} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
          <ClockIcon size={16} />
          <p>Aberto</p>
        </div>
      </div>

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
