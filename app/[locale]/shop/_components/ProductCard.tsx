import { GetProductsType } from "@/app/data/get-products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: GetProductsType;
  locale: string;
}

const ProductCard = ({ product, locale }: ProductCardProps) => {
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

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group hover:border-primary flex h-full flex-col overflow-hidden border border-transparent transition-all duration-300"
    >
      <div className="bg-card relative aspect-square w-full overflow-hidden">
        {discount && (
          <Badge className="absolute top-2 left-2 text-sm font-extrabold">
            {formatNumber(locale, discount)}%
          </Badge>
        )}
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1 space-y-1.5">
          <p className="text-sm">{product.category.title}</p>

          <h3
            className="line-clamp-1 text-lg leading-tight font-medium"
            title={product.title}
          >
            {product.title}
          </h3>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          {discount ? (
            <div className="flex flex-col">
              <del className="flex items-baseline gap-1 font-semibold opacity-50">
                <span className="text-xs">€</span>
                <span className="text-base">{formattedPrice}</span>
              </del>
              <div className="flex items-baseline gap-1 font-semibold">
                <span className="text-base">€</span>
                <span className="text-xl">{formattedDiscountPrice}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-baseline gap-1 font-semibold">
              <span className="text-base">€</span>
              <span className="text-xl">{formattedPrice}</span>
            </div>
          )}

          <Button
            type="button"
            size="icon"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-colors"
          >
            <Plus className="size-5" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
