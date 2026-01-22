import Heading from "@/components/global/Heading";
import { useTranslations } from "next-intl";
import CartContent from "./_components/CartContent";

const CartPage = () => {
  const t = useTranslations("cart");

  return (
    <section className="layout-spacing space-y-14 text-center">
      <Heading title={t("shoppingCart")} description={t("desc")} />

      <CartContent />
    </section>
  );
};

export default CartPage;
