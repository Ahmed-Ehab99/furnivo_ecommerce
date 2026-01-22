"use client";

import AnimatedList from "@/components/AnimatedList";
import EmptyState from "@/components/global/EmptyState";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { formatNumber } from "@/lib/utils";
import { calculateItemTotal } from "@/redux/cartSlice";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "../hooks/useCart";

const CartContent = () => {
  const t = useTranslations("cart");
  const params = useParams();
  const locale = params.locale as string;
  const isArabic = locale === "ar";

  const {
    items,
    total,
    loading,
    itemCount,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useCart(locale);

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-20">
        <Spinner className="size-30" />
      </div>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <EmptyState
        className="h-auto"
        icon={ShoppingBag}
        titleKey="empty.title"
        namespace="cart"
        descriptionKey="empty.description"
        primaryAction={{
          href: "/shop",
          labelKey: "empty.startShopping",
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <div className="flex items-center justify-center gap-5">
        <h2 className="text-xl font-bold">
          {t("items")} ({formatNumber(locale, itemCount)})
        </h2>
        <Button
          size="icon-lg"
          title={t("clearCart")}
          onClick={clearCart}
          className="hover:text-destructive"
        >
          <Trash2 className="size-3 md:size-5" />
        </Button>
      </div>
      <AnimatedList
        items={items}
        showGradients={false}
        enableArrowNavigation={false}
        displayScrollbar={false}
        renderItem={(item) => {
          const itemTotal = calculateItemTotal(item);

          return (
            <div className="grid grid-cols-3 items-center justify-between gap-4 md:grid-cols-[auto_1fr_140px] md:gap-8">
              <div className="relative aspect-square size-26 rounded-4xl md:size-34">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="bg-card rounded-4xl object-contain"
                  sizes="(max-width: 768px) 136px, 104px"
                />
              </div>

              <div className="grid grid-cols-1 items-center justify-evenly gap-4 md:grid-cols-2 md:gap-8">
                <div className="flex min-w-0 flex-col items-center gap-1">
                  <h3
                    title={item.title}
                    className="line-clamp-1 text-base font-medium"
                  >
                    {item.title}
                  </h3>
                  <Link
                    href={`/product/${item.slug}`}
                    className="w-fit text-xs font-normal hover:underline"
                  >
                    {t("aboutItem")}
                  </Link>
                </div>

                <div className="flex items-center justify-between gap-4 lg:justify-end lg:gap-7">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:text-destructive size-5 shrink-0 md:size-9"
                    title={t("removeItem")}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="size-3 md:size-5" />
                  </Button>

                  <div className="flex items-center gap-2 lg:gap-3">
                    <Button
                      size="icon"
                      className="size-5 shrink-0 rounded-full md:size-9"
                      onClick={() => decrementQuantity(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="size-3 md:size-4" />
                    </Button>
                    <span className="w-4 text-sm md:w-6 md:text-base">
                      {formatNumber(locale, item.quantity)}
                    </span>
                    <Button
                      size="icon"
                      className="size-5 shrink-0 rounded-full md:size-9"
                      onClick={() => incrementQuantity(item.id)}
                      disabled={item.quantity >= item.maxQuantity}
                    >
                      <Plus className="size-3 md:size-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 font-semibold">
                <div className="flex items-end gap-1">
                  <span className="text-lg">{isArabic ? "ج.م" : "$"}</span>
                  <span className="text-2xl">
                    {formatNumber(locale, itemTotal)}
                  </span>
                </div>
                {item.discount && (
                  <del className="flex items-end gap-1 opacity-50">
                    <span className="text-xs">{isArabic ? "ج.م" : "$"}</span>
                    <span className="text-base">
                      {formatNumber(locale, item.price * item.quantity)}
                    </span>
                  </del>
                )}
              </div>
            </div>
          );
        }}
      />
      <div className="flex items-center justify-between">
        <span className="font-bold capitalize">{t("total")}</span>
        <div className="flex items-end gap-1 font-semibold">
          <span className="text-base">{isArabic ? "ج.م" : "$"}</span>
          <span className="text-xl">{formatNumber(locale, total)}</span>
        </div>
      </div>
      <Button className="w-full rounded-full">{t("placeOrder")}</Button>
    </div>
  );
};

export default CartContent;
