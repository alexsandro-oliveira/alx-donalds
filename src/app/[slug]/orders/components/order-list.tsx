"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { formatCurrency } from "@/helper/format-currency";
import { OrderStatus, type Order, type Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
            avatarImageUrl: true;
          };
        };
        orderProducts: {
          include: {
            product: true;
          };
        };
      };
    }>
  >;
  consumptionMethod: string;
}

const getStatusLabel = (status: OrderStatus) => {
  if (status === "FINISHED") return "Finalizado";
  if (status === "PENDING") return "Pendente";
  if (status === "IN_PREPARATION") return "Em preparo";
  if (status === "PAYMENT_CONFIRMED") return "Pagamento confirmado";
  if (status === "PAYMENT_FAILED") return "Pagamento falhou";
  return "";
};

const OrderList = ({ orders, consumptionMethod }: OrderListProps) => {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const consumptioinMethod = consumptionMethod;

  console.log({ slug, consumptioinMethod });

  const router = useRouter();
  const handleBackClick = () => router.push(`/${slug}/menu`);

  return (
    <div className="mx-auto max-w-screen-lg space-y-6 p-6">
      <header>
        <Button
          size="icon"
          variant="secondary"
          className="rounded-full"
          onClick={handleBackClick}
        >
          {" "}
          <ChevronLeftIcon />
        </Button>
      </header>

      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>

      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <p className="text-sm text-muted-foreground">Pedido #:</p>
                <span className="text-sm font-semibold">{order.id}</span>
              </div>

              <time className="flex items-center gap-1 text-xs text-muted-foreground">
                {format(new Date(order.createdAt), "dd/MMM 'às' HH:mm'hs'", {
                  locale: ptBR,
                })}
              </time>
            </div>
            <Separator />
            <div
              className={`w-fit rounded-full px-2 py-1 text-xs font-semibold text-white ${
                order.status === OrderStatus.FINISHED ||
                order.status === OrderStatus.PAYMENT_CONFIRMED
                  ? "bg-green-500 text-white"
                  : order.status === OrderStatus.IN_PREPARATION
                    ? "bg-gray-200 text-gray-500"
                    : order.status === OrderStatus.PAYMENT_FAILED
                      ? "bg-red-500 text-white"
                      : "bg-primary text-white"
              } `}
            >
              {getStatusLabel(order.status)}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <Image
                  src={order.restaurant.avatarImageUrl}
                  alt={order.restaurant.name}
                  fill
                  className="rounded-sm"
                />
              </div>
              <p className="text-sm font-semibold">{order.restaurant.name}</p>
            </div>
            <Separator />
            <div className="space-y-2">
              {order.orderProducts.map((orderProduct) => (
                <div key={orderProduct.id} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                    {orderProduct.quantity}
                  </div>
                  <p className="text-sm">{orderProduct.product.name}</p>
                </div>
              ))}
            </div>
            <Separator />
            <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;
