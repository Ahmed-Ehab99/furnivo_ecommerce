"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import ArFlag from "../../public/egyFlag.svg";
import EnFlag from "../../public/usaFlag.svg";
import { Toggle } from "./toggle";

type Locale = "en" | "ar";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

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
      className="hover:bg-secondary hover:text-secondary-foreground data-[state=on]:text-secondary-foreground data-[state=on]:hover:bg-secondary cursor-pointer data-[state=on]:bg-transparent"
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
