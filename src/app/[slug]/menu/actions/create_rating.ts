"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateRatingInput {
  rating: number;
  restaurantId: string;
  slug?: string;
}

export const createRating = async (input: CreateRatingInput) => {
  await db.rating.create({
    data: {
      ...input,
    },
  });
  revalidatePath(`/${input.slug}/menu`);
};
