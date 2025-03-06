import { formatCurrency } from "@/helper/format-currency";
import type { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import DiscountBadge from "./discount-badge";
import { calculateTotalPrice } from "@/helper/price";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const consumptionMethod = searchParams.get("consumptionMethod");

  return (
    <div className="space-y-3 px-5">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${slug}/menu/${product.id}?consumptionMethod=${consumptionMethod}`}
          className="flex items-center justify-between gap-10 border-b py-3"
        >
          <div>
            <h3 className="text-xs font-medium">{product.name}</h3>
            <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
              {product.description}
            </p>
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {formatCurrency(calculateTotalPrice(product))}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
          </div>
          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg bg-gray-100 object-contain"
            />
            {product.discountPercentage > 0 && (
              <div className="absolute left-2 top-2">
                <DiscountBadge product={product} />
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
