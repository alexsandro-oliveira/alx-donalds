"use client";

import { Button } from "@/components/ui/button";
import type { Product, Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface ProductHeaderProps {
  product: Pick<Product, "imageUrl" | "name">;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const handleBackClick = () => router.back();

  const handleOrdersClick = () => router.push(`/${slug}/orders`);

  return (
    <div className="relative min-h-[300px] w-full">
      <Button
        size="icon"
        variant="secondary"
        className="absolute left-4 top-4 z-50 rounded-full bg-white"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="bg-gray-100 object-contain"
        priority
      />
      <Button
        size="icon"
        variant="secondary"
        className="absolute right-4 top-4 z-50 rounded-full bg-white"
        onClick={handleOrdersClick}
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default ProductHeader;
