"use client";

import {
  addToCart as addToCartAction,
  clearCart as clearCartServerAction,
  getCart as getCartAction,
  removeItemFromCart as removeItemFromCartAction,
  updateCartItemQuantity as updateCartItemQuantityAction,
} from "@/app/[locale]/cart/actions";
import { CartItem } from "@/lib/types";
import {
  clearCart as clearCartAction,
  optimisticAddItem,
  optimisticRemoveItem,
  optimisticUpdateQuantity,
  setCart,
  setLoading,
} from "@/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

export function useCart(locale: string = "en") {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const t = useTranslations("toastes");

  const loadCart = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await getCartAction(locale);

      if (result.success && result.cart) {
        dispatch(
          setCart({ items: result.cart.items, total: result.cart.total }),
        );
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      dispatch(setLoading(false));
    }
  }, [dispatch, locale]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = async (
    item: Omit<CartItem, "id" | "quantity">,
    quantity: number = 1,
  ) => {
    // Optimistic update
    dispatch(optimisticAddItem({ ...item, quantity } as CartItem));

    // Server update
    const result = await addToCartAction(item.productId, quantity);

    if (result.success) {
      toast.success(t(result.message || "success.general"));
      // Reload cart to sync with server
      await loadCart();
      return true;
    } else {
      toast.error(t(result.error || "error.unexpected"));
      // Revert optimistic update
      await loadCart();
      return false;
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    // Optimistic update
    dispatch(optimisticRemoveItem(cartItemId));

    // Server update
    const result = await removeItemFromCartAction(cartItemId);

    if (result.success) {
      toast.success(t(result.message || "success.general"));
    } else {
      toast.error(t(result.error || "error.unexpected"));
      // Revert optimistic update
      await loadCart();
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    // Optimistic update
    dispatch(optimisticUpdateQuantity({ id: cartItemId, quantity }));

    // Server update
    const result = await updateCartItemQuantityAction(cartItemId, quantity);

    if (!result.success) {
      toast.error(t(result.error || "error.unexpected"));
      await loadCart();
    }
  };

  const incrementQuantity = async (cartItemId: string) => {
    const item = cart.items.find((i) => i.id === cartItemId);
    if (item && item.quantity < item.maxQuantity) {
      await updateQuantity(cartItemId, item.quantity + 1);
    }
  };

  const decrementQuantity = async (cartItemId: string) => {
    const item = cart.items.find((i) => i.id === cartItemId);
    if (item && item.quantity > 1) {
      await updateQuantity(cartItemId, item.quantity - 1);
    }
  };

  const clearCart = async () => {
    // Optimistic update
    dispatch(clearCartAction());

    // Server update
    const result = await clearCartServerAction();

    if (result.success) {
      toast.success(t(result.message || "success.general"));
    } else {
      toast.error(t(result.error || "error.unexpected"));
      // Revert optimistic update
      await loadCart();
    }
  };

  return {
    items: cart.items,
    total: cart.total,
    loading: cart.loading,
    itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    refreshCart: loadCart,
  };
}
