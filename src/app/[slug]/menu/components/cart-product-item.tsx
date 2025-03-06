import Image from "next/image";
import { CartContext, CartProduct } from "../contexts/cart";
import { formatCurrency } from "@/helper/format-currency";
import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { calculateTotalPrice } from "@/helper/price";

interface CartProductItemProps {
  product: CartProduct;
}

const CartProductItem = ({ product }: CartProductItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useContext(CartContext);

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* ESQUERDA */}
        <div className="relative h-20 w-20 rounded-xl bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain sm:h-full"
            priority
          />
        </div>
        <div className="space-y-1">
          <p className="max-w-[80%] truncate text-xs max-[425px]:max-w-[120px]">
            {product.name}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">
              {formatCurrency(calculateTotalPrice(product))}
            </span>

            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-center">
            <Button
              variant="outline"
              className="h-6 w-6 rounded-xl"
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-3">{product.quantity}</span>
            <Button
              variant="destructive"
              className="h-6 w-6 rounded-xl"
              onClick={() => increaseProductQuantity(product.id)}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
      {/* DIREITA */}
      <div>
        <Button
          variant="outline"
          className="rounded-xl"
          size="icon"
          onClick={() => removeProduct(product.id)}
        >
          <Trash2Icon />
        </Button>
      </div>
    </div>
  );
};

export default CartProductItem;
