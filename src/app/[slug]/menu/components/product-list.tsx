import type { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProductListProps {
  products: Product[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="space-y-3 px-5">
      {products.map((product) => (
        <Link
          key={product.id}
          href="/"
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
              className="rounded-lg object-contain"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
