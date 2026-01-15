"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const useShopFilters = (locale: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showOnlyDiscounted = searchParams.get("discount") === "true";

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "none" || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.replace(`/${locale}/shop?${params.toString()}`, { scroll: false });
  };

  const onCategoryChange = (value: string) => {
    updateParams({ category: value });
  };

  const onPriceSortChange = (value: string) => {
    updateParams({ sort: value });
  };

  const onDiscountChange = (checked: boolean) => {
    updateParams({ discount: checked ? "true" : null });
  };

  return {
    onCategoryChange,
    onPriceSortChange,
    onDiscountChange,
    showOnlyDiscounted,
  };
};
