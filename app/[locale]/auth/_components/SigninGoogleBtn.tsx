"use client";

import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import GoogleImg from "@/public/google.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

const SigninGoogleBtn = () => {
  const [googlePending, startGoogleTransition] = useTransition();
  const t = useTranslations("toastes");
  const authT = useTranslations("auth");

  const signInWithGoogle = () => {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success(t("success.signinGoogle"));
          },
          onError: () => {
            toast.error(t("error.signinGoogle"));
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
          alt={authT("signinGoogle")}
          title={authT("signinGoogle")}
          className="size-12 cursor-pointer"
          onClick={signInWithGoogle}
        />
      )}
    </div>
  );
};

export default SigninGoogleBtn;
