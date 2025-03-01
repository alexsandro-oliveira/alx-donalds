"use client";

import { useState } from "react";

import { toast } from "sonner";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StarRating from "./star-rating";
import { Button } from "@/components/ui/button";
import { createRating } from "../actions/create_rating";
import type { Restaurant } from "@prisma/client";

interface RatingStarProps {
  restaurant: Pick<Restaurant, "id" | "slug" | "name">;
}

const RatingStarDialog = ({ restaurant }: RatingStarProps) => {
  const [rating, setRating] = useState(0);

  const handleCreateRating = async () => {
    try {
      if (rating == 0) {
        return;
      }

      await createRating({
        restaurantId: restaurant.id,
        rating: rating,
      });

      toast.success("Avaliação enviada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar avaliação. Tente novamente");
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Avalie este Restaurante</DialogTitle>
        <DialogDescription>
          {`Toque nas estrelas para avaliar sua experiência com o ${restaurant.name}`}
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-center">
        <StarRating setRating={setRating} />
      </div>
      <DialogFooter className="mt-6 flex flex-row gap-3">
        <DialogClose asChild>
          <Button variant="secondary" className="w-full">
            Cancelar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            variant="default"
            className="w-full"
            onClick={handleCreateRating}
          >
            Confirmar
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};

export default RatingStarDialog;
