import RestaurantItem from "@/components/restaurants-item";
import { db } from "@/lib/prisma";
import { ChefHatIcon } from "lucide-react";

const HomePage = async () => {
  const restaurants = await db.restaurant.findMany({});

  return (
    <div className="h-screen px-6 pt-[75px]">
      <div className="flex flex-col items-center">
        <ChefHatIcon size={72} color="#EF4444" />

        <h1 className="mb-6 mt-10 text-center text-2xl font-semibold">
          Qualquer restaurante, em qualquer momento
        </h1>
        <p className="text-center text-sm text-muted-foreground">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>

      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default HomePage;
