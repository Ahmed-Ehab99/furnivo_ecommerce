import { CheckoutState, DeliveryAddress, PaymentMethod } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CheckoutState = {
  currentStep: 1,
  completedSteps: [],
  deliveryAddress: null,
  paymentMethod: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // Navigate to step
    setCurrentStep: (state, action: PayloadAction<number>) => {
      const targetStep = action.payload;

      // Ensure step is 1-3
      if (targetStep < 1 || targetStep > 3) return;

      // Can only go to next step if current is completed
      // Can always go back to previous steps
      if (
        targetStep <= state.currentStep ||
        state.completedSteps.includes(state.currentStep)
      ) {
        state.currentStep = targetStep;
      }
    },

    // Mark step as completed
    completeStep: (state, action: PayloadAction<number>) => {
      const step = action.payload;
      if (!state.completedSteps.includes(step)) {
        state.completedSteps.push(step);
      }
    },

    // Save delivery address
    setDeliveryAddress: (state, action: PayloadAction<DeliveryAddress>) => {
      state.deliveryAddress = action.payload;
      // Mark step 1 as completed
      if (!state.completedSteps.includes(1)) {
        state.completedSteps.push(1);
      }
    },

    // Save payment method
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
      // Mark step 2 as completed
      if (!state.completedSteps.includes(2)) {
        state.completedSteps.push(2);
      }
    },

    // Reset checkout (after successful order or cancel)
    resetCheckout: () => initialState,

    // Load from sessionStorage
    loadCheckout: (state, action: PayloadAction<CheckoutState>) => {
      const loaded = action.payload;
      // Ensure step is at least 1
      return {
        ...loaded,
        currentStep: Math.min(3, Math.max(1, loaded.currentStep)),
      };
    },
  },
});

export const {
  setCurrentStep,
  completeStep,
  setDeliveryAddress,
  setPaymentMethod,
  resetCheckout,
  loadCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
