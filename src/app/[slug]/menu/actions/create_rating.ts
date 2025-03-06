"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateRatingInput {
  rating: number;
  restaurantId: string;
  slug?: string;
}

export const createRating = async (input: CreateRatingInput) => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  await db.rating.create({
    data: {
      ...input,
      userId: session.user.id,
    },
  });
  revalidatePath(`/${input.slug}/menu`);
};
