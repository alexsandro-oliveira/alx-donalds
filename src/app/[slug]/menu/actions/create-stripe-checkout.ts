"use server";

import Stripe from "stripe";
import type { CartProduct } from "../contexts/cart";
import { headers } from "next/headers";
import { db } from "@/lib/prisma";
import { removeCpfPunctuation } from "@/helper/cpf-validator";

interface CreateStripeCheckoutInput {
  products: CartProduct[];
  orderId: number;
  slug: string;
  consumptionMethod: string;
  cpf: string;
}

export const createStripeCheckout = async ({
  products,
  orderId,
  slug,
  consumptionMethod,
  cpf,
}: CreateStripeCheckoutInput) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing Stripe secret key");
  }

  const productsWithPrice = await db.product.findMany({
    where: {
      id: {
        in: products.map((product) => product.id),
      },
    },
  });

  const discount =
    (productsWithPrice.find((p) => p.id === products[0].id)!.price *
      productsWithPrice.find((p) => p.id === products[0].id)!
        .discountPercentage) /
    100;

  const priceWithDiscount =
    productsWithPrice.find((p) => p.id === products[0].id)!.price - discount;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
  });

  const reqHeaders = await headers();
  const origin = reqHeaders.get("origin") as string;

  const searchParams = new URLSearchParams();
  searchParams.set("consumptionMethod", consumptionMethod);
  searchParams.set("cpf", removeCpfPunctuation(cpf));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${origin}/${slug}/orders?${searchParams.toString()}`,
    cancel_url: `${origin}/${slug}/orders?${searchParams.toString()}`,
    metadata: {
      orderId,
    },
    line_items: products.map((product) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: product.name,
          images: [product.imageUrl],
        },
        unit_amount: parseInt(String(priceWithDiscount * 100)),
      },
      quantity: product.quantity,
    })),
  });
  return { sessionId: session.id };
};
