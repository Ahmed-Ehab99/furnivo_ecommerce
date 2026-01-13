"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import Image from "next/image";
import ArFlag from "../../public/egyFlag.svg";
import EnFlag from "../../public/usaFlag.svg";
import { Toggle } from "./toggle";

type Locale = "en" | "ar";

export default function LocaleSwitcher({ open }: { open?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === `/${locale}`;

  const switchLocale = (pressed: boolean) => {
    const nextLocale: Locale = pressed ? "ar" : "en";

    if (nextLocale !== locale) {
      router.replace(pathname, { locale: nextLocale });
      router.refresh();
    }
  };

  return (
    <Toggle
      pressed={locale === "ar"}
      onPressedChange={switchLocale}
      aria-label="Toggle language"
      className={cn(
        isHome && !open
          ? "data-[state=on]:hover:bg-secondary/20 hover:bg-secondary/20 text-white hover:text-white data-[state=on]:text-white"
          : "data-[state=on]:hover:bg-secondary hover:bg-secondary data-[state=on]:text-secondary-foreground hover:text-foreground text-shadow-foreground",
        "cursor-pointer data-[state=on]:bg-transparent",
      )}
    >
      {locale === "en" ? (
        <span className="flex items-center gap-1">
          <Image src={ArFlag} alt="arabic" className="max-w-6" />
          AR
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <Image src={EnFlag} alt="english" className="max-w-6" />
          EN
        </span>
      )}
    </Toggle>
  );
}
