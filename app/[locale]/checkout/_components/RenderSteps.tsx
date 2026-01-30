"use client";

import Heading from "@/components/global/Heading";
import { Spinner } from "@/components/ui/spinner";
import { useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import DeliveryAddressStep from "./steps/DeliveryAddressStep";
import PaymentMethodStep from "./steps/PaymentMethodStep";
import ReviewOrderStep from "./steps/ReviewOrderStep";

const RenderSteps = ({ locale }: { locale: string }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const currentStep = useAppSelector((state) => state.checkout.currentStep);
  const t = useTranslations("checkout");

  // Redirect if not authenticated
  useEffect(() => {
    if (isAuthenticated === false) {
      router.push(
        `/${locale}/auth?redirect=${encodeURIComponent(`/${locale}/checkout`)}`,
      );
    }
  }, [isAuthenticated, locale, router]);

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner className="size-12" />
      </div>
    );
  }

  return (
    <section>
      <div className="mx-auto mb-10 text-center">
        <Heading
          title={t("title")}
          description={t("description")}
          className="capitalize"
        />
      </div>
      {currentStep === 1 && <DeliveryAddressStep locale={locale} />}
      {currentStep === 2 && <PaymentMethodStep locale={locale} />}
      {currentStep === 3 && <ReviewOrderStep locale={locale} />}
    </section>
  );
};

export default RenderSteps;
