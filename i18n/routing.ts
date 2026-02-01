import { locales } from "@/lib/constants";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: locales,
  defaultLocale: "en",
});
