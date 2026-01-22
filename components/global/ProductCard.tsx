"use client";

import { useCart } from "@/app/[locale]/cart/hooks/useCart";
import { GetProductsType } from "@/app/data/get-products";
import { Badge } from "@/components/ui/badge";
import { cn, formatNumber } from "@/lib/utils";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import AddToCartBtn from "./AddToCartBtn";

interface ProductCardProps {
  product: GetProductsType;
  locale: string;
}

const ProductCard = ({ product, locale }: ProductCardProps) => {
  const { items } = useCart(locale);

  // Check if product is in cart
  const itemInCart = useMemo(() => {
    return items.find((item) => item.productId === product.id);
  }, [items, product.id]);

  // Calculate available stock
  const availableStock = useMemo(() => {
    const inCartQuantity = itemInCart?.quantity || 0;
    return product.quantity - inCartQuantity;
  }, [itemInCart, product.quantity]);

  const price =
    typeof product.price === "number" ? product.price : Number(product.price);
  const discount =
    typeof product.discount === "number"
      ? product.discount
      : product.discount
        ? Number(product.discount)
        : null;

  const finalPrice =
    discount !== null ? Math.max(price * (1 - discount / 100), 0) : price;

  const formattedPrice = formatNumber(locale, price);
  const formattedDiscountPrice = formatNumber(locale, finalPrice);
  const isArabic = locale === "ar";

  return (
    <div className="group hover:border-primary relative flex h-full flex-col overflow-hidden rounded-4xl border border-transparent transition-all duration-300">
      <Link
        href={`/product/${product.slug}`}
        className="bg-card relative aspect-square w-full overflow-hidden"
      >
        {discount && (
          <Badge className="absolute top-2 left-2 text-sm font-extrabold">
            {formatNumber(locale, discount)}%
          </Badge>
        )}
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          loading="eager"
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <div className="bg-background flex flex-1 flex-col p-4">
        <div className="flex-1 space-y-1.5">
          <p className="text-xs md:text-sm">{product.category.title}</p>

          <Link
            href={`/product/${product.slug}`}
            className="group-hover:text-primary line-clamp-1 text-base leading-tight font-medium md:text-lg"
            title={product.title}
          >
            {product.title}
          </Link>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          {discount ? (
            <div
              className={cn(
                "flex items-baseline gap-0.5 font-semibold",
                isArabic
                  ? "flex-row-reverse justify-end"
                  : "flex-row justify-start",
              )}
            >
              <span className="text-xs md:text-sm">
                {isArabic ? "ج.م" : "$"}
              </span>
              <span className="text-base md:text-lg">
                {formattedDiscountPrice}
              </span>
            </div>
          ) : (
            <div
              className={cn(
                "flex items-baseline gap-0.5 font-semibold",
                isArabic
                  ? "flex-row-reverse justify-end"
                  : "flex-row justify-start",
              )}
            >
              <span className="text-xs md:text-sm">
                {isArabic ? "ج.م" : "$"}
              </span>
              <span className="text-base md:text-lg">{formattedPrice}</span>
            </div>
          )}

          <AddToCartBtn
            product={product}
            size="icon-sm"
            disabled={availableStock === 0}
          >
            <Plus className="size-4" />
          </AddToCartBtn>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
