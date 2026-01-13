"use client";

import { cn } from "@/lib/utils";
import DarkSearch from "@/public/dark-search.svg";
import LightSearch from "@/public/light-search.svg";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";
import { Button } from "../../ui/button";

const SearchBtn = ({ open }: { open?: boolean }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { locale } = useParams();
  const isHome = pathname === `/${locale}`;

  const markMounted = useEffectEvent(() => {
    setMounted(true);
  });

  useEffect(() => {
    markMounted();
  }, []);

  const isDark = theme === "dark";

  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className={cn(isHome && "hover:bg-secondary/20")}
    >
      <Link href="/search">
        {mounted ? (
          <Image
            src={
              isDark
                ? DarkSearch
                : open
                  ? LightSearch
                  : isHome
                    ? DarkSearch
                    : LightSearch
            }
            alt="Search"
            className="size-5"
          />
        ) : (
          <span className="size-5" />
        )}
      </Link>
    </Button>
  );
};

export default SearchBtn;
