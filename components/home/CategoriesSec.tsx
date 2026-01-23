import { getCategories } from "@/app/data/get-categories";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import CategoryCard from "./CategoryCard";

const CategoriesSec = ({ locale }: { locale: string }) => {
  const t = useTranslations("home");

  return (
    <section className="layout-spacing flex flex-col items-center gap-10 md:gap-20 lg:flex-row lg:items-end">
      <h2 className="font-gilroy text-[2.5rem] font-extrabold">
        {t("categoriesTitle")}
      </h2>

      <Suspense fallback={<RenderCategoriesSkeleton />}>
        <RenderCategories locale={locale} />
      </Suspense>
    </section>
  );
};

export default CategoriesSec;

const RenderCategories = async ({ locale }: { locale: string }) => {
  const categories = await getCategories(locale);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          imageSrc={cat.thumbnail}
          imageAlt={cat.imageAlt}
          title={cat.title}
          desc={cat.description}
          slug={cat.slug}
          locale={locale}
        />
      ))}
    </div>
  );
};

const RenderCategoriesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-135.5 w-86 rounded-xl md:h-100 md:w-54.5 lg:h-123.5 lg:w-85.5"
        />
      ))}
    </div>
  );
};
