"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import RatingStarDialog from "./rating-dialog";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import SidebarSheet from "./sidebar-sheet";
import { useSession } from "next-auth/react";
import SignInDialog from "./signIn-dialog";

interface RestaurantMenuPageProps {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name" | "id" | "slug">;
}

const RestaurantHeader = ({ restaurant }: RestaurantMenuPageProps) => {
  const { data } = useSession();

  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const handleBackClick = () => router.push(`/${slug}`);

  return (
    <div className="relative mx-auto h-[200px] w-full max-w-screen-lg lg:h-[300px]">
      <Button
        size="icon"
        variant="secondary"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
        priority
      />

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-4 z-50 rounded-full"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SidebarSheet />
      </Sheet>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="absolute bottom-8 right-4 z-50 gap-1 rounded-full opacity-80"
          >
            <StarIcon size={16} color="#FFB100" fill="#FFB100" />
            <span className="text-xs font-medium">Avalie</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[80%] rounded-3xl">
          <DialogDescription />
          {data?.user ? (
            <RatingStarDialog restaurant={restaurant} />
          ) : (
            <SignInDialog />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantHeader;
