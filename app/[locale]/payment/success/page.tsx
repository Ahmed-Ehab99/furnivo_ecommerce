import Heading from "@/components/global/Heading";
import { Button } from "@/components/ui/button";
import { MainRoutesParams } from "@/lib/types";
import { cn } from "@/lib/utils";
import ShapeLeft from "@/public/shapes/shapeLeft.svg";
import ShapeRight from "@/public/shapes/shapeRight.svg";
import SuccessImg from "@/public/success.svg";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.payment");
  return {
    title: t("successTitle"),
  };
}

const CheckoutSuccessPage = async ({
  params,
}: {
  params: MainRoutesParams;
}) => {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const t = await getTranslations("payment.success");

  return (
    <div className="relative">
      <div className="layout-spacing flex min-h-screen flex-col items-center justify-center gap-20">
        <Heading
          title={t("title")}
          description={t("description")}
          className="text-center"
        />
        <Image src={SuccessImg} alt="Congratulations" />

        <Button asChild>
          <Link href={`/${locale}`}>{t("btnText")}</Link>
        </Button>
      </div>

      <Image
        src={ShapeRight}
        alt="Shape"
        loading="eager"
        className={cn(
          "absolute end-0 top-0 -z-50 max-w-40 lg:max-w-52",
          isArabic && "rotate-y-180",
        )}
      />
      <Image
        src={ShapeLeft}
        alt="Shape"
        loading="eager"
        className={cn(
          "absolute start-0 bottom-0 -z-50 max-w-40 lg:max-w-52",
          isArabic && "rotate-y-180",
        )}
      />
    </div>
  );
};

export default CheckoutSuccessPage;
