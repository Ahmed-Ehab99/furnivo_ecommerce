import { getCategories } from "@/app/data/get-categories";
import { HomeParams } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import CategoryCard from "./CategoryCard";

const CategoriesSec = async ({ params }: { params: HomeParams }) => {
  const { locale } = await params;
  const categories = await getCategories(locale);
  const t = await getTranslations("home");

  return (
    <section className="container mx-auto flex flex-col items-center gap-10 px-4 my-30 md:gap-20 lg:flex-row lg:items-end lg:my-40">
      <h2 className="font-gilroy text-[2.5rem] font-extrabold">
        {t("categoriesTitle")}
      </h2>
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
    </section>
  );
};

export default CategoriesSec;
