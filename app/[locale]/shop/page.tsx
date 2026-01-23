import { Skeleton } from "@/components/ui/skeleton";
import { MainRoutesParams, SearchParams } from "@/lib/types";
import { cn } from "@/lib/utils";
import ShapeLeft from "@/public/shapes/searchLeft.svg";
import ShapeRight from "@/public/shapes/shapeRight.svg";
import Image from "next/image";
import { Suspense, use } from "react";
import ShopContent from "./_components/ShopContent";
import { ShopFiltersSkeleton } from "./_components/ShopFilters";

const ShopPage = ({
  params,
  searchParams,
}: {
  params: MainRoutesParams;
  searchParams: SearchParams;
}) => {
  const { locale } = use(params);
  const isArabic = locale === "ar";

  return (
    <div className="relative">
      <div className="layout-spacing">
        <Suspense fallback={<ShopContentSkeleton />}>
          <ShopContent locale={locale} searchParams={searchParams} />
        </Suspense>
      </div>

      <Image
        loading="eager"
        src={ShapeRight}
        alt="Shape"
        className={cn(
          "absolute end-0 top-0 -z-50 max-w-40 lg:max-w-52",
          isArabic && "rotate-y-180",
        )}
      />
      <Image
        loading="eager"
        src={ShapeLeft}
        alt="Shape"
        className={cn(
          "absolute start-0 bottom-0 -z-50 max-w-40 lg:max-w-52",
          isArabic && "rotate-y-180",
        )}
      />
    </div>
  );
};

export default ShopPage;

const ShopContentSkeleton = () => {
  return (
    <>
      <ShopFiltersSkeleton />

      <div className="grid grid-cols-2 items-center gap-10 px-4 py-8 md:grid-cols-3 md:gap-16 lg:grid-cols-4 lg:gap-20">
        {[...Array(8)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-73 w-full rounded-4xl md:h-81 lg:h-94"
          />
        ))}
      </div>

      <div className="mx-auto my-8 flex w-full justify-center">
        <Skeleton className="h-9 w-71 lg:w-94" />
      </div>
    </>
  );
};
