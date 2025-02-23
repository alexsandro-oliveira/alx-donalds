import Image from "next/image";
import { CartContext, type CartProduct } from "../contexts/cart";
import { formatCurrency } from "@/helper/format-currency";
import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

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
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        <div className="space-y-1">
          <p className="max-w-[90%] truncate text-ellipsis text-xs">
            {product.name}
          </p>
          <span className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </span>
          <div className="flex items-center gap-3 text-center">
            <Button
              variant="outline"
              className="h-7 w-7 rounded-lg"
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4">{product.quantity}</span>
            <Button
              variant="destructive"
              className="h-7 w-7 rounded-lg"
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
