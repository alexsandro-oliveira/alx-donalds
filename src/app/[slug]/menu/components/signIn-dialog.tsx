import { signIn } from "next-auth/react";
import { Button } from "../../../../components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import Image from "next/image";

const SignInDialog = () => {
  const handleLoginWithGoogle = () => signIn("google");

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do Google.
        </DialogDescription>
      </DialogHeader>
      <Button
        variant="outline"
        className="text-base font-bold"
        onClick={handleLoginWithGoogle}
      >
        <Image
          alt="login com google"
          src="/googleIcon.svg"
          width={18}
          height={18}
        />
        Google
      </Button>
    </>
  );
};

export default SignInDialog;
