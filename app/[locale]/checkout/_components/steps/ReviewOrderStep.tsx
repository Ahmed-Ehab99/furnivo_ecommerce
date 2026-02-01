"use client";

import { useAuth } from "@/app/[locale]/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, formatNumber } from "@/lib/utils";
import AmazonPayLogo from "@/public/amazon-pay-logo.svg";
import MasterCardLogo from "@/public/mastercard-logo.svg";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useCheckout } from "../../hooks/useCheckout";

const ReviewOrderStep = ({ locale }: { locale: string }) => {
  const { user } = useAuth();
  const {
    items,
    total,
    deliveryAddress,
    paymentMethod,
    goToPreviousStep,
    goToStep,
    placeOrder,
    isProcessing,
  } = useCheckout(locale);

  const isArabic = locale === "ar";
  const t = useTranslations("checkout");

  const handlePlaceOrder = async () => {
    const result = await placeOrder();

    if (result?.url) {
      // Redirect to Stripe
      window.location.href = result.url;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-base font-semibold uppercase md:text-xl lg:text-2xl">
          {t("stepThree.title")}
        </h2>
        <p className="text-xs font-normal opacity-60 md:text-base">
          {t("stepThree.subTitle", {
            customer: user?.name || "customer",
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
        {/* Left Side */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold uppercase md:text-xl lg:text-2xl">
            {t("stepThree.shoppingCartTitle")} ({items.length})
          </h3>

          <div className="bg-card max-h-96 space-y-4 overflow-y-auto rounded-2xl p-4 md:max-h-110 lg:max-h-80">
            {items.map((item, index) => {
              const finalPrice = item.discount
                ? item.price * (1 - item.discount / 100)
                : item.price;
              const itemSubtotal = finalPrice * item.quantity;
              const formattedFinalPrice = formatNumber(locale, finalPrice);
              const formattedSubtotal = formatNumber(locale, itemSubtotal);

              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex gap-4",
                    index !== items.length - 1 && "border-b pb-4",
                  )}
                >
                  <div className="group relative aspect-square w-24 shrink-0 rounded-2xl border md:w-28 lg:w-32">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="rounded-md object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 96px, 112px"
                    />

                    {/* Discount Badge */}
                    {item.discount && (
                      <div className="bg-primary absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-bold">
                        -{formatNumber(locale, item.discount)}%
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="line-clamp-1 font-medium">{item.title}</p>
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-xs opacity-80"
                      >
                        {t("stepThree.aboutItem")}
                      </Link>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      {/* Subtotal */}
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <span>{t("stepThree.subtotal")}: </span>
                        <div className={cn("flex items-baseline gap-0.5")}>
                          <span>{isArabic ? "ج.م" : "$"}</span>
                          <span>{formattedFinalPrice}</span>
                          <span className="text-xs opacity-60">
                            × {formatNumber(locale, item.quantity)}
                          </span>
                        </div>
                      </div>
                      {/* Final Price */}
                      <div className="flex items-center gap-1 font-semibold">
                        <span>{isArabic ? "ج.م" : "$"}</span>
                        <span>{formattedSubtotal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Right Side */}
        <div className="space-y-10">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Delivery Address Card */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-semibold uppercase md:text-xl lg:text-2xl">
                {t("stepThree.deliveryAddressTitle")}
              </h3>
              <div className="bg-card flex h-full flex-col gap-3 rounded-2xl p-5">
                <div className="flex-1 space-y-2 text-sm">
                  <div className="flex gap-1">
                    <span className="text-muted-foreground">
                      {t("stepThree.city")}:
                    </span>
                    <span className="font-medium">{deliveryAddress?.city}</span>
                  </div>

                  <div className="flex gap-1">
                    <span className="text-muted-foreground">
                      {t("stepThree.street")}:
                    </span>
                    <span className="font-medium">
                      {deliveryAddress?.streetName}
                    </span>
                  </div>

                  <div className="flex gap-1">
                    <span className="text-muted-foreground">
                      {t("stepThree.building")}:
                    </span>
                    <span className="font-medium">
                      {deliveryAddress?.buildingName}
                    </span>
                  </div>
                </div>

                <Button
                  variant="link"
                  onClick={() => goToStep(2)}
                  className="text-primary h-auto justify-start p-0"
                >
                  {t("stepThree.edit")}
                </Button>
              </div>
            </div>

            {/* Payment Card */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-semibold uppercase md:text-2xl">
                {t("stepThree.payment")}
              </h3>
              <div className="bg-card flex h-full flex-col gap-3 rounded-2xl p-5">
                <div className="flex flex-1 flex-col gap-3">
                  <p className="text-sm font-normal">
                    {paymentMethod === "CARD"
                      ? t("stepTwo.cardPayment")
                      : t("stepTwo.amazon_pay")}
                  </p>
                  <Image
                    src={
                      paymentMethod === "CARD" ? MasterCardLogo : AmazonPayLogo
                    }
                    alt={paymentMethod === "CARD" ? "Mastercard" : "Amazon Pay"}
                    className="max-w-20"
                  />
                </div>
                <Button
                  variant="link"
                  onClick={() => goToStep(1)}
                  className="text-primary h-auto justify-start p-0"
                >
                  {t("stepThree.edit")}
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Total Price */}
          <div className="flex items-center justify-between">
            <span>{t("stepThree.total")}</span>
            <div className="flex items-end gap-1 font-semibold">
              <span className="text-base">{isArabic ? "ج.م" : "$"}</span>
              <span className="text-xl">{formatNumber(locale, total)}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
          disabled={isProcessing}
          className="gap-2"
        >
          {locale === "ar" ? (
            <ArrowRight className="size-4" />
          ) : (
            <ArrowLeft className="size-4" />
          )}
          {t("back")}
        </Button>

        <Button onClick={handlePlaceOrder} disabled={isProcessing} size="lg">
          {isProcessing ? t("stepThree.processing") : t("stepThree.buyNow")}
        </Button>
      </div>
    </div>
  );
};

export default ReviewOrderStep;
