import { defineRouting } from "next-intl/routing";

export const LOCALES = ["en", "ar"];

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: "en",
});
