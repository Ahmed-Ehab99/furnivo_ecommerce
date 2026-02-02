"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

const LoginBtn = ({
  setOpen,
}: {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const t = useTranslations("auth");

  return (
    <Button
      title={t("signinBtn")}
      asChild
      size="icon"
      onClick={() => setOpen?.(false)}
    >
      <Link href="/auth">
        <LogIn />
      </Link>
    </Button>
  );
};

export default LoginBtn;
