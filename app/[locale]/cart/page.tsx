import Heading from "@/components/global/Heading";
import { MainRoutesParams } from "@/lib/types";
import { cn } from "@/lib/utils";
import CenterShape from "@/public/shapes/centerShape.svg";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import CartContent from "./_components/CartContent";

const CartPage = async ({ params }: { params: MainRoutesParams }) => {
  const { locale } = await params;
  const t = await getTranslations("cart");
  setRequestLocale(locale);
  const isArabic = locale === "ar";

  return (
    <section className="layout-spacing space-y-14 text-center">
      <div className="relative">
        <Heading title={t("shoppingCart")} description={t("desc")} />
        <Image
          src={CenterShape}
          alt="Shape"
          loading="eager"
          className={cn(
            "absolute top-1/2 left-1/2 -z-50 max-w-80 -translate-x-1/2 -translate-y-1/2",
            isArabic && "rotate-y-180",
          )}
        />
      </div>

      <CartContent locale={locale} />
    </section>
  );
};

export default CartPage;
