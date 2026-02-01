"use client";

import { CheckoutState } from "@/lib/types";
import { loadCheckout } from "@/redux/features/checkout/checkoutSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useRef } from "react";

function isCheckoutState(value: unknown): value is CheckoutState {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;

  if (typeof v.currentStep !== "number" || !Number.isFinite(v.currentStep)) {
    return false;
  }

  if (
    !Array.isArray(v.completedSteps) ||
    v.completedSteps.some((s) => typeof s !== "number" || !Number.isFinite(s))
  ) {
    return false;
  }

  const addr = v.deliveryAddress;
  if (
    addr !== null &&
    (typeof addr !== "object" ||
      addr === null ||
      typeof (addr as Record<string, unknown>).city !== "string" ||
      typeof (addr as Record<string, unknown>).streetName !== "string" ||
      typeof (addr as Record<string, unknown>).buildingName !== "string")
  ) {
    return false;
  }

  const method = v.paymentMethod;
  if (method !== null && method !== "CARD" && method !== "AMAZON_PAY") {
    return false;
  }

  return true;
}

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
        const parsed: unknown = JSON.parse(savedCheckout);
        if (isCheckoutState(parsed)) {
          dispatch(loadCheckout(parsed));
        } else {
          sessionStorage.removeItem("checkout");
        }
      } catch (err) {
        console.error("Failed to parse checkout:", err);
        sessionStorage.removeItem("checkout");
      }
    }

    hasLoaded.current = true;
  }, [dispatch]);

  // Persist on change
  useEffect(() => {
    if (!hasLoaded.current) return;

    // Keep storage clean: don't persist an "empty" checkout state
    const isEmptyCheckout =
      checkout.currentStep === 1 &&
      checkout.completedSteps.length === 0 &&
      checkout.deliveryAddress == null &&
      checkout.paymentMethod == null;

    if (isEmptyCheckout) {
      sessionStorage.removeItem("checkout");
      return;
    }

    sessionStorage.setItem("checkout", JSON.stringify(checkout));
  }, [checkout]);

  return <>{children}</>;
};

export default CheckoutProvider;
