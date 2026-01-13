"use client";

import DarkLogo from "@/public/dark-logo.png";
import LightLogo from "@/public/light-logo.png";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useEffectEvent, useState } from "react";

const FooterLogo = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === "dark";

  const markMounted = useEffectEvent(() => {
    setMounted(true);
  });

  useEffect(() => {
    markMounted();
  }, []);

  return (
    <div>
      {mounted ? (
        <Image
          src={isDark ? DarkLogo : LightLogo}
          alt="Furnivo Logo"
          className="max-w-20"
          loading="eager"
        />
      ) : (
        <span className="max-w-20" />
      )}
    </div>
  );
};

export default FooterLogo;
