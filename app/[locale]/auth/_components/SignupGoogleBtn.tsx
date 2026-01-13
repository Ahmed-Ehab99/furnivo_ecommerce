"use client";

import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";
import GoogleImg from "@/public/google.svg";

const SignupGoogleBtn = () => {
  const [googlePending, startGoogleTransition] = useTransition();

  const signInWithGoogle = () => {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Google, you will be redirected...");
          },
          onError: (error) => {
            console.error(error);
            toast.error(error.error.statusText || "Internal server error");
          },
        },
      });
    });
  };

  return (
    <div className="flex items-center justify-center">
      {googlePending ? (
        <Spinner className="size-12" />
      ) : (
        <Image
          src={GoogleImg}
          alt="Signup with google"
          className="size-12 cursor-pointer"
          onClick={signInWithGoogle}
        />
      )}
    </div>
  );
};

export default SignupGoogleBtn;
