import Image from "next/image";

const HomePage = () => {
  return (
    <div className="px-6 pb-[286px] pt-[75px]">
      <div className="mb-[97px] flex flex-col items-center justify-center space-y-1">
        <Image src="/McLogo.png" width={80} height={80} alt="Mc Log" />
        <h2 className="text-lg font-semibold">Alx Donald´s</h2>
      </div>
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-2xl font-semibold">Seja bem-vindo!</h1>
        <p>
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>
    </div>
  );
};

export default HomePage;
