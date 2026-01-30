"use client";

import { loadCheckout } from "@/redux/features/checkout/checkoutSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useRef } from "react";

const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const checkout = useAppSelector((state) => state.checkout);
  const hasLoaded = useRef(false);

  // Load from sessionStorage (once)
  useEffect(() => {
    if (hasLoaded.current) return;

    const savedCheckout = sessionStorage.getItem("checkout");
    if (savedCheckout) {
      try {
        dispatch(loadCheckout(JSON.parse(savedCheckout)));
      } catch (err) {
        console.error("Failed to parse checkout:", err);
      }
    }

    hasLoaded.current = true;
  }, [dispatch]);

  // Persist on change
  useEffect(() => {
    if (!hasLoaded.current) return;

    sessionStorage.setItem("checkout", JSON.stringify(checkout));
  }, [checkout]);

  return <>{children}</>;
};

export default CheckoutProvider;
