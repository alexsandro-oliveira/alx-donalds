"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helper/format-currency";
import type { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: { name: true; avatarImageUrl: true };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const handleIncrementQuantity = () => setQuantity(quantity + 1);
  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="relative z-50 mt-[-1rem] flex flex-auto flex-col rounded-t-3xl bg-white px-5 py-5">
      <div className="flex-auto">
        <div className="flex gap-1">
          {/* RESTAURANTE */}
          <div className="flex items-center gap-1">
            <Image
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              width={16}
              height={16}
              className="rounded-full"
            />
            <p className="text-xs opacity-40">{product.restaurant.name}</p>
          </div>
        </div>

        {/* NOME DO PRODUTO */}
        <h2 className="mt-1 text-lg font-semibold">{product.name}</h2>

        {/* PREÇO E QUANTIDADE */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </span>
          <div className="flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-xl"
              onClick={handleDecrementQuantity}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4">{quantity}</span>
            <Button
              size="icon"
              variant="destructive"
              className="h-8 w-8 rounded-xl"
              onClick={handleIncrementQuantity}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/* SOBRE */}
        <div className="mt-6 space-y-3">
          <h4 className="mt-6 text-sm font-semibold">Sobre</h4>
          <p className="mt-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>

        {/* INGREDIENTES */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-1.5">
            <ChefHatIcon size={16} />
            <h4 className="text-sm font-semibold">Ingredientes</h4>
          </div>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
      </div>

      <Button className="mt-6 w-full rounded-full">Adicionar à sacola</Button>
    </div>
  );
};

export default ProductDetails;
