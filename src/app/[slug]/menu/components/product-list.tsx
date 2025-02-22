import { formatCurrency } from "@/helper/format-currency";
import type { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div className="space-y-3 px-5">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${slug}/menu/${product.id}`}
          className="flex items-center justify-between gap-10 border-b py-3"
        >
          <div>
            <h3 className="text-xs font-medium">{product.name}</h3>
            <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
              {product.description}
            </p>
            <span className="font-semibold">
              {formatCurrency(product.price)}
            </span>
          </div>
          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg bg-gray-100 object-contain"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
