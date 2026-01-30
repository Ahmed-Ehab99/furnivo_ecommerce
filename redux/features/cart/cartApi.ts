import {
  addToCart as addToCartAction,
  clearCart as clearCartAction,
  getCart as getCartAction,
  removeItemFromCart as removeItemAction,
  updateCartItemQuantity as updateQtyAction,
} from "@/app/[locale]/cart/actions";
import { CartItem, CartState } from "@/lib/types";
import { calculateItemTotal } from "@/lib/utils";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

const recalculateTotals = (items: CartItem[]) => {
  const total = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, totalItems };
};

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    // 1. GET CART
    getCart: builder.query<CartState, string>({
      queryFn: async (locale) => {
        const res = await getCartAction(locale);
        // Ensure res.cart exists and items is an array before processing
        if (res.success && res.cart && Array.isArray(res.cart.items)) {
          const { total, totalItems } = recalculateTotals(
            res.cart.items as CartItem[],
          );

          return {
            data: {
              ...res.cart,
              items: res.cart.items as CartItem[],
              total,
              totalItems,
              loading: false,
            },
          };
        }
        return { error: res.error || "Failed to fetch cart" };
      },
      providesTags: ["Cart"],
    }),

    // 2. ADD TO CART (Optimistic)
    addToCart: builder.mutation({
      // We accept the full item for the optimistic update, but only use ID/qty for the server
      queryFn: async ({
        productId,
        quantity,
      }: {
        productId: string;
        quantity: number;
        itemDetails: CartItem;
        locale: string;
      }) => {
        const res = await addToCartAction(productId, quantity);
        return res.success ? { data: res } : { error: res.error };
      },
      // Optimistic Update Logic
      onQueryStarted: async (
        { itemDetails, quantity, locale },
        { dispatch, queryFulfilled },
      ) => {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", locale, (draft) => {
            // Hardcoded 'en' for now, pass locale if dynamic
            const existingItem = draft.items.find(
              (i) => i.productId === itemDetails.productId,
            );

            if (existingItem) {
              existingItem.quantity += quantity;
            } else {
              draft.items.push({ ...itemDetails, quantity });
            }

            // Update Totals immediately
            const { total, totalItems } = recalculateTotals(draft.items);
            draft.total = total;
            draft.totalItems = totalItems;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // Rollback if server fails
        }
      },
      invalidatesTags: ["Cart"],
    }),

    // 3. UPDATE QUANTITY (Optimistic)
    updateQuantity: builder.mutation({
      queryFn: async ({
        id,
        quantity,
      }: {
        id: string;
        quantity: number;
        locale: string;
      }) => {
        const res = await updateQtyAction(id, quantity);
        return res.success ? { data: res } : { error: res.error };
      },
      onQueryStarted: async (
        { id, quantity, locale },
        { dispatch, queryFulfilled },
      ) => {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", locale, (draft) => {
            const item = draft.items.find((i) => i.id === id);
            if (item) {
              item.quantity = quantity;
              const { total, totalItems } = recalculateTotals(draft.items);
              draft.total = total;
              draft.totalItems = totalItems;
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // 4. REMOVE ITEM (Optimistic)
    removeItem: builder.mutation({
      queryFn: async ({
        cartItemId,
      }: {
        cartItemId: string;
        locale: string;
      }) => {
        const res = await removeItemAction(cartItemId);
        return res.success ? { data: res } : { error: res.error };
      },
      onQueryStarted: async (
        { cartItemId, locale },
        { dispatch, queryFulfilled },
      ) => {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", locale, (draft) => {
            // Filter out the item
            draft.items = draft.items.filter((i) => i.id !== cartItemId);

            // Recalculate totals immediately
            const { total, totalItems } = recalculateTotals(draft.items);
            draft.total = total;
            draft.totalItems = totalItems;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // Put it back if server fails
        }
      },
    }),

    // 5. CLEAR CART (Optimistic)
    clearCart: builder.mutation({
      queryFn: async ({}: { locale: string }) => {
        const res = await clearCartAction();
        return res.success ? { data: res } : { error: res.error };
      },
      onQueryStarted: async ({ locale }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", locale, (draft) => {
            draft.items = [];
            draft.total = 0;
            draft.totalItems = 0;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateQuantityMutation,
  useRemoveItemMutation,
  useClearCartMutation,
} = cartApi;
