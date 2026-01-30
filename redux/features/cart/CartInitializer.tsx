"use client";

import { GetCartType } from "@/app/[locale]/cart/actions";
import { CartItem } from "@/lib/types";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useRef } from "react";
import { cartApi } from "./cartApi";

export default function CartInitializer({
  cartData,
  locale = "en",
}: {
  cartData: GetCartType["cart"] | null;
  locale?: string;
}) {
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    // Only run once and only if we have data from the server
    if (!initialized.current && cartData) {
      const totalItems = cartData.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );

      const initialData = {
        ...cartData,
        items: cartData.items as CartItem[],
        totalItems,
        loading: false,
      };

      // Seeding the cache
      dispatch(cartApi.util.upsertQueryData("getCart", locale, initialData));

      initialized.current = true;
    }
  }, [cartData, dispatch, locale]);

  return null;
}
