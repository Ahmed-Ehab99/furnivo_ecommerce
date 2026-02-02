import { MainRoutesParams } from "@/lib/types";
import { cn } from "@/lib/utils";
import CheckoutProvider from "@/providers/CheckoutProvider";
import ShapeLeft from "@/public/shapes/shapeLeft.svg";
import ShapeRight from "@/public/shapes/shapeRight.svg";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import CheckoutStepper from "./_components/CheckoutStepper";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.checkout");
  return {
    title: t("title"),
  };
}

export default async function CheckoutLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: MainRoutesParams;
}) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return (
    <CheckoutProvider>
      <div className="relative min-h-screen">
        <div className="layout-spacing max-w-5xl space-y-10">
          {/* Stepper Header */}
          <div className="flex justify-center border-b pb-6">
            <div className="w-full">
              <CheckoutStepper />
            </div>
          </div>

          {/* Step Content */}
          <div>{children}</div>
        </div>

        <Image
          src={ShapeRight}
          alt="Shape"
          loading="lazy"
          className={cn(
            "absolute end-0 top-0 -z-50 hidden max-w-40 lg:block lg:max-w-52",
            isArabic && "rotate-y-180",
          )}
        />
        <Image
          src={ShapeLeft}
          alt="Shape"
          loading="eager"
          className={cn(
            "absolute start-0 bottom-0 -z-50 hidden max-w-40 lg:block lg:max-w-52",
            isArabic && "rotate-y-180",
          )}
        />
      </div>
    </CheckoutProvider>
  );
}
