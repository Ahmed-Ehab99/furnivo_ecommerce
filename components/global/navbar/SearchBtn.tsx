"use client";

import DarkSearch from "@/public/dark-search.svg";
import LightSearch from "@/public/light-search.svg";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useEffectEvent, useState } from "react";
import { Button } from "../../ui/button";

const SearchBtn = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const markMounted = useEffectEvent(() => {
    setMounted(true);
  });

  useEffect(() => {
    markMounted();
  }, []);

  const isDark = theme === "dark";

  return (
    <Button asChild variant="ghost" size="icon">
      <Link href="/search">
        {mounted ? (
          <Image
            src={isDark ? DarkSearch : LightSearch}
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
