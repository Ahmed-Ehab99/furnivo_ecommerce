import { Skeleton } from "@/components/ui/skeleton";
import { MainRoutesParams, SearchParams } from "@/lib/types";
import { cn } from "@/lib/utils";
import Shape1 from "@/public/shapes/searchLeft.svg";
import Shape2 from "@/public/shapes/searchRight.svg";
import Image from "next/image";
import { Suspense } from "react";
import ShopContent from "./_components/ShopContent";
import { ShopFiltersSkeleton } from "./_components/ShopFilters";

const ShopPage = async ({
  params,
  searchParams,
}: {
  params: MainRoutesParams;
  searchParams: SearchParams;
}) => {
  const { locale } = await params;
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
        src={Shape2}
        alt="Shape"
        className={cn(
          "absolute top-0 -z-50 max-w-40 lg:max-w-52",
          isArabic ? "left-0 rotate-y-180" : "right-0",
        )}
      />
      <Image
        loading="eager"
        src={Shape1}
        alt="Shape"
        className={cn(
          "absolute bottom-0 -z-50 max-w-40 lg:max-w-52",
          isArabic ? "right-0 rotate-y-180" : "left-0",
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
