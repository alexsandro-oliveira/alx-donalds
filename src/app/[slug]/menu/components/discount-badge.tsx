import type { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

interface DiscountBadgeProps {
  product: Pick<Product, "discountPercentage">;
}

const DiscountBadge = ({ product }: DiscountBadgeProps) => {
  return (
    <div className="flex items-center gap-[2px] rounded-full bg-destructive px-1 py-[2px] text-white">
      <ArrowDownIcon size={10} />
      <span className="text-[9px] font-semibold">
        {product.discountPercentage}%
      </span>
    </div>
  );
};

export default DiscountBadge;
