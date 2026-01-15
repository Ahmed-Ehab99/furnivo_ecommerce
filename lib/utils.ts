import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(locale: string, number: number) {
  const formattedNumber = new Intl.NumberFormat(
    locale === "ar" ? "ar-EG" : "en-US",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  ).format(number);

  return formattedNumber;
}
