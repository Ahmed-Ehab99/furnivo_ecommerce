import { Skeleton } from "@/components/ui/skeleton";

const ProductLoading = () => {
  return (
    <section className="layout-spacing space-y-10">
      <div className="flex flex-col gap-2">
        <Skeleton className="size-9" />
        <Skeleton className="h-5 w-77" />
      </div>

      <div className="flex flex-col justify-center gap-10 md:flex-row md:gap-20 lg:gap-30">
        <Skeleton className="h-111 w-full md:max-w-1/3" />
        <Skeleton className="h-87.5 w-full" />
      </div>
    </section>
  );
};

export default ProductLoading;
