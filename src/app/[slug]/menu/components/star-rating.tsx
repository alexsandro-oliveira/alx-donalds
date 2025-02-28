"use client";

import { StarIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface RatingStarProps {
  setRating: Dispatch<SetStateAction<number>>;
}

const StarRating = ({ setRating }: RatingStarProps) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const handleClick = (value: number) => {
    setCurrentValue(value);
    setRating(value);
  };

  const handleMouseOver = (newHoverValue: any) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div className="my-2 flex flex-row justify-center gap-2">
      {stars.map((_, index) => {
        return (
          <StarIcon
            key={index}
            className="cursor-pointer"
            size={24}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            color="#FFB100"
            fill={(hoverValue || currentValue) > index ? "#FFB100" : "#ffffff"}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
