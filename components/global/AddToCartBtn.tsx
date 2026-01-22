"use client";

import { useCart } from "@/app/[locale]/cart/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { ProductT } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface AddToCartBtnProps {
  product: ProductT;
  quantityToAdd?: number;
  onSuccess?: () => void;
  disabled: boolean;
  size?: "default" | "icon" | "sm" | "lg" | "icon-sm" | "icon-lg" | null;
  children: React.ReactNode;
  className?: string;
}

const AddToCartBtn = ({
  product,
  quantityToAdd = 1,
  onSuccess,
  disabled = false,
  size,
  children,
  className,
}: AddToCartBtnProps) => {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations("toastes");
  const { addToCart, loading } = useCart(locale);
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.warning(t("error.requiredAuth") || "error.unexpected");
      // Redirect to auth page
      router.push(
        `/${locale}/auth?redirect=${encodeURIComponent(window.location.pathname)}`,
      );
      return;
    }

    // Validate quantity
    if (quantityToAdd < 1 || quantityToAdd > product.quantity) {
      toast.error("Invalid quantity");
      return;
    }

    // User is authenticated, proceed with adding to cart
    const success = await addToCart(
      {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        description: product.description,
        price: product.price,
        discount: product.discount || null,
        maxQuantity: product.quantity,
        image: product.image,
        imageAlt: product.imageAlt,
      },
      quantityToAdd,
    );

    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={product.quantity === 0 || loading || disabled}
      type="button"
      size={size || "default"}
      title={locale === "ar" ? "أضف الى السله" : "Add To cart"}
      className={cn(
        "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-all duration-500",
        className,
      )}
    >
      {loading ? <Spinner /> : children}
    </Button>
  );
};

export default AddToCartBtn;
