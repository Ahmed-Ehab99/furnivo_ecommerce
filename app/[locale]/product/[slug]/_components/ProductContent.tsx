import { GetProductBySlugType } from "@/app/data/get-product-by-slug";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn, formatNumber } from "@/lib/utils";
import ProductActions from "./ProductActions";

interface ProductContentProps {
  locale: string;
  isArabic: boolean;
  productData: GetProductBySlugType;
}

const ProductContent = ({
  locale,
  isArabic,
  productData,
}: ProductContentProps) => {
  const { title, description, price, discount } = productData;
  const finalPrice =
    discount !== null
      ? Math.floor(price * (1 - discount / 100))
      : Math.floor(price);
  const formattedPrice = formatNumber(locale, price);
  const formattedDiscountPrice = formatNumber(locale, finalPrice);

  return (
    <div className="flex h-full flex-col space-y-10 md:space-y-20 lg:space-y-30">
      <div className="flex flex-col">
        <div className="mb-5 flex items-center justify-between gap-10">
          <h1 className="text-3xl font-extrabold md:text-4xl lg:text-5xl">
            {title}
          </h1>

          <div className="flex items-end gap-1.5">
            <div className="flex flex-col items-center justify-center gap-0.5">
              {discount && <Badge>- {formatNumber(locale, discount)}%</Badge>}

              {discount && (
                <del
                  className={cn(
                    "flex items-baseline gap-0.5 font-semibold opacity-50",
                    isArabic
                      ? "flex-row-reverse justify-end"
                      : "flex-row justify-start",
                  )}
                >
                  <span className="text-xs">{isArabic ? "ج.م" : "$"}</span>
                  <span className="text-base">{formattedPrice}</span>
                </del>
              )}
            </div>

            <div
              className={cn(
                "flex items-baseline gap-0.5 font-semibold",
                isArabic
                  ? "flex-row-reverse justify-end"
                  : "flex-row justify-start",
              )}
            >
              <span className="text-xl lg:text-2xl">
                {isArabic ? "ج.م" : "$"}
              </span>
              <span className="text-3xl lg:text-4xl">
                {formattedDiscountPrice}
              </span>
            </div>
          </div>
        </div>

        <p className="text-base font-normal opacity-80 lg:text-xl">
          {description}
        </p>
      </div>

      <div className="flex flex-col">
        <Separator className="mb-3" />

        <ProductActions product={productData} locale={locale} />
      </div>
    </div>
  );
};

export default ProductContent;
