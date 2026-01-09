"use client";

import { navItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const DesktopNav = () => {
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("navbar");
  const locale = params.locale;
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  return (
    <>
      {navItems.map((item) => {
        const isActive = pathWithoutLocale === item.href;

        return (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              isActive ? "font-extrabold" : "font-light",
              "font-gilroy capitalize hover:text-primary",
            )}
          >
            {t(item.title)}
          </Link>
        );
      })}
    </>
  );
};

export default DesktopNav;
