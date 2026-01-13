"use client";

import { navItems } from "@/lib/constants";
import { Session } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatedThemeToggler } from "../../ui/animated-theme-toggler";
import { Button } from "../../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";
import LocaleSwitcher from "../../ui/local-switcher";
import { Separator } from "../../ui/separator";
import CartBtn from "./CartBtn";
import LoginBtn from "./LoginBtn";
import SearchBtn from "./SearchBtn";
import SignoutBtn from "./SignoutBtn";

const MobileNav = ({ session }: { session: Session | null }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { locale } = useParams();
  const t = useTranslations("navbar");
  const isHome = pathname === `/${locale}`;
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(isHome && "text-white")}
        >
          <Menu className="size-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerDescription>Mobile Menu</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col space-y-4 p-4">
          {navItems.map((item) => {
            const isActive = pathWithoutLocale === item.href;

            return (
              <DrawerClose asChild key={item.title}>
                <Link
                  href={item.href}
                  className={cn(
                    isActive ? "font-extrabold" : "font-light",
                    "font-gilroy capitalize",
                  )}
                >
                  {t(item.title)}
                </Link>
              </DrawerClose>
            );
          })}
          <Separator />
          <div className="flex items-center justify-between">
            <SearchBtn open={open} />
            <CartBtn open={open} />
            <AnimatedThemeToggler open={open} />
            <LocaleSwitcher open={open} />
            {session && <SignoutBtn open={open} />}
          </div>
          {!session && <LoginBtn setOpen={setOpen} />}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;
