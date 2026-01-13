"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

const LoginBtn = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const t = useTranslations("auth");

  return (
    <Button asChild>
      <Link href="/auth" onClick={() => setOpen(false)}>
        {t("signinBtn")}
      </Link>
    </Button>
  );
};

export default LoginBtn;
