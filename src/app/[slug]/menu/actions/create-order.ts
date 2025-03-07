"use server";

import { removeCpfPunctuation } from "@/helper/cpf-validator";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import type { ConsumptionMethod } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
  userId: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });
  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  // pegar os preços dos produtos
  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const productsWithPricesAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price:
      productsWithPrices.find((p) => p.id === product.id)!.price *
      (1 -
        productsWithPrices.find((p) => p.id === product.id)!
          .discountPercentage /
          100),
  }));

  // criar o pedido
  const order = await db.order.create({
    data: {
      status: "PENDING",
      userId: session.user.id,
      customerName: input.customerName,
      customerCpf: removeCpfPunctuation(input.customerCpf),
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      total: productsWithPricesAndQuantities.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
      consumptionMethod: input.consumptionMethod,
      restaurantId: restaurant.id,
    },
  });
  revalidatePath(`/${input.slug}/orders`);
  // redirect(
  //   `/${input.slug}/orders?cpf=${removeCpfPunctuation(input.customerCpf)}`,
  // );
  return order;
};
