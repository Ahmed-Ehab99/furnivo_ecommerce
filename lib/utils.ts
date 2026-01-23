import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(locale: string, number: number) {
  const formattedNumber = new Intl.NumberFormat(
    locale === "ar" ? "ar-EG" : "en-US",
    {
      maximumFractionDigits: 0,
    },
  ).format(number);

  return formattedNumber;
}

export const getDiscountedUnitPrice = (item: CartItem): number => {
  if (!item.discount || item.discount <= 0) return item.price;

  return Math.max(item.price * (1 - item.discount / 100), 0);
};

export const calculateItemTotal = (item: CartItem): number => {
  return getDiscountedUnitPrice(item) * item.quantity;
};
