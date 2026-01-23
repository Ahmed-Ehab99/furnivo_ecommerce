"use client";

import { CartItem } from "@/lib/types";
import {
  useAddToCartMutation,
  useClearCartMutation,
  useGetCartQuery,
  useRemoveItemMutation,
  useUpdateQuantityMutation,
} from "@/redux/cartApi";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useCart(locale: string = "en") {
  const t = useTranslations("toastes");

  // Get Data
  const { data, isLoading, refetch } = useGetCartQuery(locale);

  // Mutations
  const [addToCartMutation] = useAddToCartMutation();
  const [updateQtyMutation] = useUpdateQuantityMutation();
  const [removeItemMutation] = useRemoveItemMutation();
  const [clearCartMutation] = useClearCartMutation();

  // Fallback state while loading
  const cart = data || { items: [], total: 0, totalItems: 0, loading: true };

  const addToCart = async (
    item: Omit<CartItem, "id" | "quantity">,
    quantity: number = 1,
    locale: string,
  ): Promise<boolean> => {
    try {
      // Pass 'itemDetails' for the optimistic update
      // We generate a temp ID because the real ID comes from DB,
      // but for UI purposes, a temp ID is fine until next fetch.
      await addToCartMutation({
        productId: item.productId,
        quantity,
        itemDetails: {
          ...item,
          quantity,
          id: `temp-${Date.now()}`,
        } as CartItem,
        locale,
      }).unwrap();

      toast.success(t("success.addToCart"));
      return true;
    } catch {
      toast.error(t("error.addToCart"));
      return false;
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      await removeItemMutation({ cartItemId, locale }).unwrap();
      toast.success(t("success.removeItem"));
    } catch {
      toast.error(t("error.removeItem"));
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    try {
      await updateQtyMutation({ id: cartItemId, quantity, locale }).unwrap();
      // No toast needed for qty update usually, keeps UI clean
    } catch {
      toast.error(t("error.quantityUpdate"));
    }
  };

  const incrementQuantity = async (cartItemId: string) => {
    const item = cart.items.find((i) => i.id === cartItemId);
    // Check maxQuantity locally before firing mutation
    if (item && item.quantity < item.maxQuantity) {
      await updateQuantity(cartItemId, item.quantity + 1);
    } else {
      toast.error(t("error.exceedAvailableStock"));
    }
  };

  const decrementQuantity = async (cartItemId: string) => {
    const item = cart.items.find((i) => i.id === cartItemId);
    if (item && item.quantity > 1) {
      await updateQuantity(cartItemId, item.quantity - 1);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartMutation({ locale }).unwrap();
      toast.success(t("success.clearCart"));
    } catch {
      toast.error(t("error.clearCart"));
    }
  };

  return {
    items: cart.items,
    total: cart.total,
    loading: isLoading,
    itemCount: cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    refreshCart: refetch,
  };
}
