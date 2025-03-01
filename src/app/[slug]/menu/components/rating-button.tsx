"use client";

import { Button } from "@/components/ui/button";
import type React from "react";
import type { ReactNode } from "react";

const RatingButton = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Button variant="outline" className="gap-2 rounded-full">
        {children}
      </Button>
    </>
  );
};

export default RatingButton;
