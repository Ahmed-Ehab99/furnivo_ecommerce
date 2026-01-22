"use client";

import { GetCartType } from "@/app/[locale]/cart/actions";
import { setCart } from "@/redux/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useRef } from "react";

export default function CartInitializer({ cartData }: { cartData: GetCartType["cart"] | null }) {
  const dispatch = useAppDispatch();
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only run once when component mounts
    if (hasInitialized.current) return;

    // Initialize cart (even if empty)
    if (cartData) {
      dispatch(
        setCart({
          items: cartData.items || [],
          total: cartData.total || 0,
        })
      );
    } else {
      // If no cart data, initialize empty cart
      dispatch(
        setCart({
          items: [],
          total: 0,
        })
      );
    }

    hasInitialized.current = true;
  }, [cartData, dispatch]);

  return null;
}