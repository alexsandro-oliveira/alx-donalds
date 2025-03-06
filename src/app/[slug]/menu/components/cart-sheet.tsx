import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helper/format-currency";
import FinishOrderDialog from "./finish-order-dialog";
import { Separator } from "@/components/ui/separator";

const CartSheet = () => {
  const [finishOrderDialogOpen, setFinishOrderDialogOpen] = useState(false);
  const { isOpen, toggleCart, products, total, subtotal } =
    useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[85%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <SheetDescription />
        <div className="flex h-full flex-col py-5">
          <div className="flex-auto">
            {products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </div>

          <Card className="mb-6">
            <CardContent className="space-y-2 p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Subtotal</p>
                <p className="text-sm font-semibold">
                  {formatCurrency(subtotal)}
                </p>
              </div>

              <Separator />

              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Descontos</p>
                <p className="text-sm font-semibold">
                  {formatCurrency(total - subtotal)}
                </p>
              </div>

              <Separator />

              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-sm font-semibold">{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>

          <Button
            disabled={products.length === 0}
            className="w-full rounded-full"
            onClick={() => setFinishOrderDialogOpen(true)}
          >
            Finalizar Pedido
          </Button>

          <FinishOrderDialog
            open={finishOrderDialogOpen}
            onOpenChange={setFinishOrderDialogOpen}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
