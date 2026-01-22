"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import DarkSearch from "@/public/dark-search.svg";
import LightSearch from "@/public/light-search.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";

interface SearchInputProps {
  locale: string;
  className?: string;
  inputClassName?: string;
}

const SearchInput = ({
  locale,
  className,
  inputClassName,
}: SearchInputProps) => {
  const t = useTranslations("search");
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const isHome = pathname === `/${locale}`;
  const isArabic = locale === "ar";

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      router.push(
        `/${locale}/shop?search=${encodeURIComponent(searchQuery.trim())}`,
      );
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={cn("relative mx-auto flex w-full max-w-lg", className)}
    >
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={`${t("input")}`}
        className={cn(
          "h-fit rounded-full py-2.5 text-sm placeholder:font-light",
          isArabic ? "pl-10" : "pr-10",
          inputClassName,
        )}
      />
      <Button
        type="submit"
        className={cn(
          "absolute top-1/2 -translate-y-1/2 cursor-pointer hover:bg-transparent",
          isArabic ? "left-2" : "right-2",
        )}
        variant="ghost"
        size="icon"
        aria-label={t("input")}
      >
        <Image
          src={DarkSearch}
          alt={`${t("input")}`}
          className={cn("hidden size-7 dark:block", isHome && "block")}
          priority
        />
        <Image
          src={LightSearch}
          alt={`${t("input")}`}
          className={cn("size-7 dark:hidden", isHome && "hidden")}
          priority
        />
      </Button>
    </form>
  );
};

export default SearchInput;
