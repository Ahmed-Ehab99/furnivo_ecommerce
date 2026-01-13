"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const SignoutBtn = ({ open }: { open?: boolean }) => {
  const router = useRouter();
  const t = useTranslations("toastes");
  const pathname = usePathname();
  const { locale } = useParams();
  const isHome = pathname === `/${locale}`;

  const handleSignout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success(`${t("success.signout")}`);
            router.replace("/");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error(error);
      toast.error(`${t("error.signout")}`);
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleSignout}
      className={cn(isHome && "hover:bg-secondary/20")}
    >
      <LogOut
        className={cn(
          isHome && !open ? "text-white" : "text-secondary-foreground",
          "size-5",
        )}
      />
    </Button>
  );
};

export default SignoutBtn;
