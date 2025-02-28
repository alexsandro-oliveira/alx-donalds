"use server";

import { db } from "@/lib/prisma";

interface GetRatingRestaurantProps {
  id: string;
}

export const getRatingRestaurant = async ({ id }: GetRatingRestaurantProps) => {
  const rating = await db.rating.aggregate({
    _count: true,
    _sum: {
      rating: true,
    },
    where: {
      restaurantId: id,
    },
  });

  return {
    totalRatings: rating._count,
    rating:
      rating._sum.rating == null
        ? (0).toFixed(1)
        : (rating._sum.rating / rating._count).toFixed(1),
  };
};
