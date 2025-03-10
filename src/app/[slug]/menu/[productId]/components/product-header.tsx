"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import type { ConsumptionMethod, Product } from "@prisma/client";
import { ChevronLeftIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import SidebarSheet from "../../components/sidebar-sheet";

interface ProductHeaderProps {
  product: Pick<Product, "imageUrl" | "name">;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const consumptionMethod = searchParams.get(
    "consumptionMethod",
  ) as ConsumptionMethod;

  const handleBackClick = () =>
    router.push(`/${slug}/menu?consumptionMethod=${consumptionMethod}`);

  console.log(slug, consumptionMethod);
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
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-4 z-50 rounded-full"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SidebarSheet />
      </Sheet>
    </div>
  );
};

export default ProductHeader;
