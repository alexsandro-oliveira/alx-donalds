import type { Restaurant } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface RestaurantItemProps {
  restaurant: Pick<Restaurant, "name" | "avatarImageUrl" | "slug" | "id">;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <div className="mt-[97px] flex flex-col justify-center space-y-1">
      <h2 className="mb-3 text-sm">Escolha o restaurante:</h2>
      <Link href={`/${restaurant.slug}`} className="flex flex-col items-center">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={68}
          height={69}
        />
        <h2 className="text-sm font-semibold">{restaurant.name}</h2>
      </Link>
    </div>
  );
};

export default RestaurantItem;
