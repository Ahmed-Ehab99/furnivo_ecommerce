import { Skeleton } from "@/components/ui/skeleton";

const CategoryLoading = () => {
  return (
    <div className="layout-spacing space-y-20">
      <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-10 lg:gap-20">
        <Skeleton className="w-full h-110" />
        <Skeleton className="h-110 w-full" />
      </div>
      <div>
        <div className="grid grid-cols-2 items-center gap-10 px-4 py-8 md:grid-cols-3 md:gap-16 lg:grid-cols-4 lg:gap-20">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-64.5 w-34 md:h-80 md:w-48 lg:h-93 lg:w-61"
            />
          ))}
        </div>
        <div className="mx-auto mt-8 flex items-center justify-center">
          <Skeleton className="h-9 w-64" />
        </div>
      </div>
    </div>
  );
};

export default CategoryLoading;
