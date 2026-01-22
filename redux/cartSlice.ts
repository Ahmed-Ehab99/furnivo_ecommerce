import { CartItem, CartState } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
  total: 0,
  totalItems: 0,
  loading: true,
};

const getDiscountedUnitPrice = (item: CartItem): number => {
  if (!item.discount || item.discount <= 0) return item.price;

  return Math.max(item.price * (1 - item.discount / 100), 0);
};

const calculateItemTotal = (item: CartItem): number => {
  return getDiscountedUnitPrice(item) * item.quantity;
};

const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Set entire cart (from database)
    setCart: (
      state,
      action: PayloadAction<{ items: CartItem[]; total: number }>,
    ) => {
      state.items = action.payload.items;
      state.total = calculateCartTotal(state.items);
      state.totalItems = action.payload.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      state.loading = false;
    },

    optimisticAddItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId,
      );

      if (existingItem) {
        if (existingItem.quantity < existingItem.maxQuantity) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      // Recalculate total and totalItems
      state.total = calculateCartTotal(state.items);
      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
    },

    optimisticRemoveItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      state.total = calculateCartTotal(state.items);
      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
    },

    optimisticUpdateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity = Math.max(
          1,
          Math.min(action.payload.quantity, item.maxQuantity),
        );

        state.total = calculateCartTotal(state.items);
        state.totalItems = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.totalItems = 0;
      state.loading = false;
    },
  },
});

export const {
  setCart,
  optimisticAddItem,
  optimisticRemoveItem,
  optimisticUpdateQuantity,
  setLoading,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
export { calculateItemTotal };
