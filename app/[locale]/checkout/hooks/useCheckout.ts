"use client";

import { DeliveryAddress, PaymentMethod } from "@/lib/types";
import { useCreateCheckoutSessionMutation } from "@/redux/features/checkout/checkoutApi";
import {
  resetCheckout,
  setCurrentStep,
  setDeliveryAddress,
  setPaymentMethod,
} from "@/redux/features/checkout/checkoutSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useCart } from "../../cart/hooks/useCart";

export function useCheckout(locale: string = "en") {
  const dispatch = useAppDispatch();
  const checkoutState = useAppSelector((state) => state.checkout);
  const { items, total } = useCart(locale);
  const t = useTranslations("checkout");

  // Mutations
  const [createSessionMutation, { isLoading: isCreatingSession }] =
    useCreateCheckoutSessionMutation();

  // Navigation
  const goToStep = (step: number) => {
    dispatch(setCurrentStep(step));
  };

  const goToNextStep = () => {
    dispatch(setCurrentStep(checkoutState.currentStep + 1));
  };

  const goToPreviousStep = () => {
    dispatch(setCurrentStep(checkoutState.currentStep - 1));
  };

  // Save delivery address
  const saveDeliveryAddress = async (address: DeliveryAddress) => {
    try {
      dispatch(setDeliveryAddress(address));
      toast.success(t("addressSaved"));
      goToNextStep();
      return true;
    } catch {
      toast.error(t("addressSaveFailed"));
      return false;
    }
  };

  // Save payment method
  const savePaymentMethod = (method: PaymentMethod) => {
    dispatch(setPaymentMethod(method));
    toast.success(t("paymentMethodSaved"));
    goToNextStep();
  };

  // Place order (create Stripe session)
  const placeOrder = async () => {
    if (!checkoutState.deliveryAddress || !checkoutState.paymentMethod) {
      toast.error(t("missingCheckoutInfo"));
      return null;
    }

    if (items.length === 0) {
      toast.error(t("emptyCart"));
      return null;
    }

    try {
      const checkoutInput = {
        locale,
        deliveryAddress: {
          city: checkoutState.deliveryAddress.city,
          streetName: checkoutState.deliveryAddress.streetName,
          buildingName: checkoutState.deliveryAddress.buildingName,
        },
        paymentMethod: checkoutState.paymentMethod,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          title: item.title,
          description: item.description,
          image: item.image,
          slug: item.slug,
        })),
      };

      const result = await createSessionMutation(checkoutInput).unwrap();

      if (result.success && result.url) {
        // Clear checkout state
        dispatch(resetCheckout());
        sessionStorage.removeItem("checkout");

        return result;
      }

      toast.error(t("checkoutFailed"));
      return null;
    } catch (error) {
      console.error("Place order error:", error);
      if (error && typeof error === "object" && "error" in error) {
        console.error("Server error:", error.error);
        toast.error((error.error as string) || t("checkoutError"));
      } else {
        toast.error(t("checkoutError"));
      }
      return null;
    }
  };

  // Reset checkout
  const reset = () => {
    dispatch(resetCheckout());
    sessionStorage.removeItem("checkout");
  };

  return {
    // State
    currentStep: checkoutState.currentStep,
    completedSteps: checkoutState.completedSteps,
    deliveryAddress: checkoutState.deliveryAddress,
    paymentMethod: checkoutState.paymentMethod,

    // Cart info
    items,
    total,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),

    // Navigation
    goToStep,
    goToNextStep,
    goToPreviousStep,

    // Actions
    saveDeliveryAddress,
    savePaymentMethod,
    placeOrder,
    reset,

    // Loading states
    isProcessing: isCreatingSession,
  };
}
