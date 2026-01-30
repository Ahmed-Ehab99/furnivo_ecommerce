import { MainRoutesParams } from "@/lib/types";
import RenderSteps from "./_components/RenderSteps";

const CheckoutPage = async ({ params }: { params: MainRoutesParams }) => {
  const { locale } = await params;

  return <RenderSteps locale={locale} />;
};

export default CheckoutPage;
