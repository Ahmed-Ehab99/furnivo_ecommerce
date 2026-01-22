"use client";

import { useCart } from "@/app/[locale]/cart/hooks/useCart";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Button } from "../../ui/button";

const CartBtn = ({ open }: { open?: boolean }) => {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;
  const { itemCount } = useCart(locale);
  const isHome = pathname === `/${locale}`;

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(isHome && "hover:bg-secondary/20", "relative")}
    >
      <Link href="/cart">
        <ShoppingBag
          className={cn(isHome && !open && "text-white", "size-5")}
        />
        <span
          className={cn(
            isHome && "text-white",
            "bg-primary absolute -top-1 -right-1 flex items-center justify-center rounded-full px-1.5 py-1 text-xs",
          )}
        >
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      </Link>
    </Button>
  );
};

export default CartBtn;
