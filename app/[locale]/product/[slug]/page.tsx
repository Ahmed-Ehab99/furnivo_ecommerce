import { getProductBySlug } from "@/app/data/get-product-by-slug";
import BackBtn from "@/components/global/BackBtn";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Lens } from "@/components/ui/lens";
import { Separator } from "@/components/ui/separator";
import { DynamicRoutesParams } from "@/lib/types";
import { cn, formatNumber } from "@/lib/utils";
import ShapeLeft from "@/public/shapes/shapeLeft.svg";
import ShapeRight from "@/public/shapes/shapeRight.svg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductActions from "./_components/ProductActions";

const ProductDetailsPage = async ({
  params,
}: {
  params: DynamicRoutesParams;
}) => {
  const { locale, slug } = await params;
  const productData = await getProductBySlug(slug, locale);

  if (!productData) {
    return notFound();
  }

  const t = await getTranslations("general");
  const isArabic = locale === "ar";
  const {
    title,
    description,
    category,
    discount,
    price,
    images,
    categorySlug,
  } = productData;

  const finalPrice =
    discount !== null
      ? Math.floor(price * (1 - discount / 100))
      : Math.floor(price);

  const formattedPrice = formatNumber(locale, price);
  const formattedDiscountPrice = formatNumber(locale, finalPrice);

  return (
    <section className="relative">
      <div className="layout-spacing space-y-10">
        <div className="text-primary flex flex-col gap-2">
          <BackBtn isArabic={isArabic} />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-primary/80">
                  {t("categories")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                {isArabic ? <ChevronLeft /> : <ChevronRight />}
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/category/${categorySlug}`}
                  className="hover:text-primary/80"
                >
                  {category}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                {isArabic ? <ChevronLeft /> : <ChevronRight />}
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary">
                  {title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex flex-col justify-center gap-10 md:flex-row md:gap-20 lg:gap-30">
          <div className="grid h-fit w-full grid-cols-2 gap-1 md:sticky md:top-4 md:max-w-1/3">
            {images.map((image, i) => (
              <Lens
                key={image.id}
                zoomFactor={2}
                lensSize={150}
                isStatic={false}
                ariaLabel="Zoom Area"
                className={cn(
                  "bg-card relative flex items-center justify-center overflow-hidden rounded-[0.5rem]",
                  i === 0
                    ? "col-span-2 aspect-video"
                    : "col-span-1 aspect-square",
                )}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={i === 0}
                />
              </Lens>
            ))}
          </div>

          <div className="flex h-full flex-col space-y-10 md:space-y-20 lg:space-y-30">
            <div className="flex flex-col">
              <div className="mb-5 flex items-center justify-between gap-10">
                <h1 className="text-3xl font-extrabold md:text-4xl lg:text-5xl">
                  {title}
                </h1>

                <div className="flex items-end gap-1.5">
                  <div className="flex flex-col items-center justify-center gap-0.5">
                    {discount && (
                      <Badge>- {formatNumber(locale, discount)}%</Badge>
                    )}
                    
                    {discount && (
                      <del
                        className={cn(
                          "flex items-baseline gap-0.5 font-semibold opacity-50",
                          isArabic
                            ? "flex-row-reverse justify-end"
                            : "flex-row justify-start",
                        )}
                      >
                        <span className="text-xs">
                          {isArabic ? "ج.م" : "$"}
                        </span>
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
        </div>
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
    </section>
  );
};

export default ProductDetailsPage;
