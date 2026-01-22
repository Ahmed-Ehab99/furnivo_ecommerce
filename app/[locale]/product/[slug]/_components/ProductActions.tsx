"use client";

import { useCart } from "@/app/[locale]/cart/hooks/useCart";
import AddToCartBtn from "@/components/global/AddToCartBtn";
import { Button } from "@/components/ui/button";
import { ProductResult, ProductT } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

const ProductActions = ({
  product,
  locale,
}: {
  product: ProductResult;
  locale: string;
}) => {
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const { items } = useCart(locale);
  const t = useTranslations("detailes");

  // Calculate available stock (considering what's already in cart)
  const availableStock = useMemo(() => {
    const itemInCart = items.find((item) => item.productId === product.id);
    const inCartQuantity = itemInCart?.quantity || 0;
    return product.quantity - inCartQuantity;
  }, [items, product.id, product.quantity]);

  const itemInCart = items.find((item) => item.productId === product.id);

  const handleIncrement = () => {
    if (quantityToAdd < product.quantity) {
      setQuantityToAdd((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantityToAdd > 1) {
      setQuantityToAdd((prev) => prev - 1);
    }
  };

  const productPayload: ProductT = {
    id: product.id,
    slug: product.slug,
    title: product.title,
    description: product.description,
    price: product.price,
    discount: product.discount,
    quantity: product.quantity,
    image: product.images[0]?.url || "",
    imageAlt: product.images[0]?.alt || product.title,
  };

  return (
    <div className="flex flex-col gap-2 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            className="text-background rounded-full"
            onClick={handleDecrement}
            disabled={quantityToAdd <= 1}
          >
            <Minus className="size-5" />
          </Button>

          <span className="text-lg font-extrabold">
            {formatNumber(locale, quantityToAdd)}
          </span>

          <Button
            size="icon"
            className="text-background rounded-full"
            onClick={handleIncrement}
            disabled={
              quantityToAdd >= product.quantity ||
              availableStock <= quantityToAdd
            }
          >
            <Plus className="size-5" />
          </Button>
        </div>

        {availableStock > 0 ? (
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">
              {formatNumber(locale, availableStock)} {t("available")}
            </p>
            {itemInCart && (
              <p className="text-xs font-medium">
                ({formatNumber(locale, itemInCart?.quantity)} {t("inCart")})
              </p>
            )}
          </div>
        ) : (
          <p className="text-destructive text-sm font-medium">
            {product.quantity === 0 ? t("outOfStock") : t("allInCart")}
          </p>
        )}
      </div>

      <AddToCartBtn
        product={productPayload}
        quantityToAdd={quantityToAdd}
        onSuccess={() => setQuantityToAdd(1)}
        disabled={availableStock === 0 || availableStock <= quantityToAdd}
      >
        <span>{t("addToCart")}</span>
      </AddToCartBtn>
    </div>
  );
};

export default ProductActions;
