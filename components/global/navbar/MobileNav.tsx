"use client";

import { navItems } from "@/lib/constants";
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
import ShoppingCart from "./CartBtn";
import SearchIcon from "./SearchBtn";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("navbar");
  const locale = params.locale;
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
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
            <SearchIcon />
            <ShoppingCart />
            <AnimatedThemeToggler />
            <LocaleSwitcher />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;
