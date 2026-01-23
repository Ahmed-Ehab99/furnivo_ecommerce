"use client";

import DarkLogo from "@/public/dark-logo.png";
import LightLogo from "@/public/light-logo.png";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

const NavbarLogo = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { locale } = useParams();
  const isHome = pathname === `/${locale}`;
  const isDark = theme === "dark";

  const markMounted = useEffectEvent(() => {
    setMounted(true);
  });

  useEffect(() => {
    markMounted();
  }, []);

  return (
    <Link href="/">
      {mounted ? (
        <Image
          src={isDark || isHome ? DarkLogo : LightLogo}
          alt="Furnivo Logo"
          className="max-w-20"
          loading="eager"
          priority
        />
      ) : (
        <Image
          src={DarkLogo}
          alt="Furnivo Logo"
          className="max-w-20"
          loading="eager"
          priority
        />
      )}
    </Link>
  );
};

export default NavbarLogo;
