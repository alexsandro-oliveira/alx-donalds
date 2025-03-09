"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { LogInIcon, LogOutIcon, ScrollTextIcon } from "lucide-react";
import SignInDialog from "./signIn-dialog";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useParams, useRouter } from "next/navigation";

const SidebarSheet = () => {
  const { data } = useSession();

  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const handleLogountClick = () => signOut();
  const handleOrdersClick = () => router.push(`/${slug}/orders`);

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader className="pt-4">
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>

            <div>
              <p className="font-bold">{data.user.name}</p>
              <div className="text-xs">{data.user.email}</div>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold">Olá. Faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%] rounded-2xl">
                <DialogDescription />
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      {data?.user && (
        <div className="flex flex-col gap-2 border-b border-solid py-5">
          <Button
            variant="ghost"
            className="justify-start gap-2"
            onClick={handleOrdersClick}
          >
            <ScrollTextIcon size={18} />
            Pedidos
          </Button>
        </div>
      )}

      {data?.user && (
        <div className="py-5">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="justify-start gap-3">
                <LogOutIcon size={18} />
                Sair da conta
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[70%]">
              <DialogHeader>
                <DialogTitle>Sair</DialogTitle>
                <DialogDescription>
                  Deseja mesmo sair da plataforma?
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-3">
                <DialogClose asChild>
                  <Button variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={handleLogountClick}
                  className="w-full"
                >
                  Sair
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </SheetContent>
  );
};

export default SidebarSheet;
