import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantHeader from "./components/header";
import RestaurantCategories from "./components/categories";
import Image from "next/image";
import { ClockIcon, StarIcon } from "lucide-react";
import { getRatingRestaurant } from "@/_data/get-rating-restaurant";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

// com esta validação, garantimos que o valor de consumptionMethod é sempre um dos valores válidos
const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  const restaurant = await db.restaurant.findUnique({
    where: {
      slug,
    },
    include: { menuCategories: { include: { products: true } } },
  });

  if (!restaurant) {
    return notFound();
  }

  const rating = await getRatingRestaurant(restaurant);

  return (
    <div className="mx-auto max-w-screen-lg">
      <RestaurantHeader restaurant={restaurant} />
      <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white">
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={restaurant.avatarImageUrl}
                alt={restaurant.name}
                width={45}
                height={45}
              />
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold">{restaurant.name}</h1>
                <p className="text-xs text-muted-foreground">
                  {restaurant.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2">
              <div className="flex items-center gap-1">
                <StarIcon size={16} color="#FFB100" fill="#FFB100" />
                <span className="text-xs font-medium">{rating.rating}</span>
              </div>
              <div className="flex flex-col items-center justify-center text-[9px] font-medium">
                <span>{rating.totalRatings}</span>
                <p>{rating.totalRatings > 1 ? "avaliações" : "avaliação"}</p>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
            <ClockIcon size={16} />
            <p>Aberto</p>
          </div>
        </div>
      </div>

      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
