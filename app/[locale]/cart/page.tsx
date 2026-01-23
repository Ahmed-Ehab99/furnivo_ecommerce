import Heading from "@/components/global/Heading";
import { MainRoutesParams } from "@/lib/types";
import { cn } from "@/lib/utils";
import CenterShape from "@/public/shapes/centerShape.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { use } from "react";
import CartContent from "./_components/CartContent";

const CartPage = ({ params }: { params: MainRoutesParams }) => {
  const t = useTranslations("cart");
  const { locale } = use(params);
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

      <CartContent />
    </section>
  );
};

export default CartPage;
