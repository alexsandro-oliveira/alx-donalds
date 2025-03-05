"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="h-full bg-red-500 px-6 pt-[75px]">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-2xl font-semibold">
          Qualquer restaurante, em qualquer momento
        </h1>
        <p>
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>

      <div className="mt-[97px] flex flex-col items-center justify-center space-y-1">
        <Image src="/McLogo.png" width={80} height={80} alt="Mc Log" />
        <h2 className="text-lg font-semibold">Alx Donald´s</h2>
      </div>

      <Button className="fixed w-full" onClick={() => console.log("clicked")}>
        Começar
      </Button>
    </div>
  );
};

export default HomePage;
