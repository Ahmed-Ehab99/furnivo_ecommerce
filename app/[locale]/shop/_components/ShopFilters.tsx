"use client";

import { GetCategoriesType } from "@/app/data/get-categories";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";
import { useShopFilters } from "../hooks/use-shop-filters";

interface ShopFiltersProps {
  locale: string;
  categories: GetCategoriesType;
  currentCategory?: string;
  currentPriceSort?: string;
}

export const ShopFilters = ({
  locale,
  categories,
  currentCategory,
  currentPriceSort,
}: ShopFiltersProps) => {
  const {
    onCategoryChange,
    onPriceSortChange,
    onDiscountChange,
    showOnlyDiscounted,
  } = useShopFilters(locale);
  const t = useTranslations("shop");

  return (
    <div className="mb-8 flex flex-wrap items-start justify-start gap-4 md:mb-12 md:items-center">
      <Select
        value={currentCategory || undefined}
        onValueChange={onCategoryChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={t("filterByCategory")} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="all">{t("allCategories")}</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={currentPriceSort || undefined}
        onValueChange={onPriceSortChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={t("sortByPrice")} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="none">{t("noSort")}</SelectItem>
          <SelectItem value="asc">{t("lowToHigh")}</SelectItem>
          <SelectItem value="desc">{t("highToLow")}</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2.5">
        <Switch
          id="only-discounted"
          checked={showOnlyDiscounted}
          onCheckedChange={onDiscountChange}
          locale={locale}
          className="shadow-xl"
        />
        <Label
          htmlFor="only-discounted"
          className="cursor-pointer text-sm font-medium select-none"
        >
          {t("onlyDiscounted")}
        </Label>
      </div>
    </div>
  );
};

export const ShopFiltersSkeleton = () => {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-start gap-4 md:mb-12 md:items-center">
      <Skeleton className="h-9 w-44" />
      <Skeleton className="h-9 w-44" />
      <Skeleton className="h-6 w-28" />
    </div>
  );
};
