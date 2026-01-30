"use client";

import { Button } from "@/components/ui/button";
import { PaymentMethod } from "@/lib/types";
import { cn } from "@/lib/utils";
import AmazonPayLogo from "@/public/amazon-pay-logo.svg";
import MasterCardLogo from "@/public/mastercard-logo.svg";
import VisaLogo from "@/public/visa-logo.svg";
import { useAppSelector } from "@/redux/hooks";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { useCheckout } from "../../hooks/useCheckout";

const PaymentMethodStep = ({ locale }: { locale: string }) => {
  const savedPaymentMethod = useAppSelector(
    (state) => state.checkout.paymentMethod,
  );
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    savedPaymentMethod,
  );
  const t = useTranslations("checkout");
  const { goToPreviousStep, savePaymentMethod } = useCheckout(locale);

  const handleNext = () => {
    if (!selectedMethod) return;
    savePaymentMethod(selectedMethod);
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-base font-semibold uppercase md:text-2xl">
        {t("stepTwo.title")}
      </h2>

      <div className="space-y-4">
        {/* Card Payment Option */}
        <button
          onClick={() => setSelectedMethod("CARD")}
          className={cn(
            "hover:border-primary min-h-21 w-full cursor-pointer rounded-lg border-2 p-6 text-left transition-all",
            selectedMethod === "CARD"
              ? "border-primary bg-primary/5"
              : "border-gray-200",
          )}
        >
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex size-6 items-center justify-center rounded-full border-2",
                selectedMethod === "CARD"
                  ? "border-primary bg-primary"
                  : "border-gray-300",
              )}
            >
              {selectedMethod === "CARD" && (
                <div className="size-3 rounded-full bg-white" />
              )}
            </div>

            <div className="flex flex-1 items-center justify-between">
              <p className="font-semibold">{t("stepTwo.cardPayment")}</p>

              <div className="flex items-center gap-2">
                <Image src={VisaLogo} alt="Visa Logo" />
                <Image src={MasterCardLogo} alt="MasterCard" />
              </div>
            </div>
          </div>
        </button>

        {/* Amazon Pay Option */}
        <button
          onClick={() => setSelectedMethod("AMAZON_PAY")}
          className={cn(
            "hover:border-primary min-h-21 w-full cursor-pointer rounded-lg border-2 p-6 text-left transition-all",
            selectedMethod === "AMAZON_PAY"
              ? "border-primary bg-primary/5"
              : "border-gray-200",
          )}
        >
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex size-6 items-center justify-center rounded-full border-2",
                selectedMethod === "AMAZON_PAY"
                  ? "border-primary bg-primary"
                  : "border-gray-300",
              )}
            >
              {selectedMethod === "AMAZON_PAY" && (
                <div className="size-3 rounded-full bg-white" />
              )}
            </div>

            <div className="flex flex-1 items-center justify-between">
              <p className="font-semibold">{t("stepTwo.amazon_pay")}</p>

              <Image
                src={AmazonPayLogo}
                alt="Amazon Pay"
                className="max-w-24"
              />
            </div>
          </div>
        </button>
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          className="gap-2"
        >
          {locale === "ar" ? (
            <ArrowRight className="size-4" />
          ) : (
            <ArrowLeft className="size-4" />
          )}
          {t("back")}
        </Button>

        <Button
          onClick={handleNext}
          disabled={!selectedMethod}
          className="gap-2"
        >
          {t("next")}
          {locale === "ar" ? (
            <ArrowLeft className="size-4" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodStep;
