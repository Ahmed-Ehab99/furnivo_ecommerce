import { getCategoryBySlug } from "@/app/data/get-category-by-slug";
import { getProducts } from "@/app/data/get-products";
import EmptyState from "@/components/global/EmptyState";
import ProductCard from "@/components/global/ProductCard";
import { ServerPagination } from "@/components/global/ServerPagination";
import { itemsPerPage } from "@/lib/constants";
import { DynamicRoutesParams, SearchParams } from "@/lib/types";
import CategoryLeft1 from "@/public/shapes/categoryLeft1.svg";
import CategoryLeft2 from "@/public/shapes/categoryLeft2.svg";
import CategoryRight from "@/public/shapes/categoryRight.svg";
import { Search } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import CategoryHero from "./_components/CategoryHero";

export async function generateMetadata({
  params,
}: {
  params: DynamicRoutesParams;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = await getCategoryBySlug(slug, locale);

  return {
    title: category.title,
    description: category.description,
    openGraph: { images: [category.thumbnail] },
  };
}

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: DynamicRoutesParams;
  searchParams: SearchParams;
}) => {
  const { locale, slug } = await params;
  const { page: pageParam } = await searchParams;
  const category = await getCategoryBySlug(slug, locale);

  if (!category) {
    notFound();
  }

  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const page = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

  const { products, totalPages } = await getProducts({
    locale,
    categoryId: category.id,
    page,
    limit: itemsPerPage,
  });

  if (products.length === 0) {
    return (
      <EmptyState
        namespace="shop"
        icon={Search}
        titleKey="noProducts"
        descriptionKey="noProductsDesc"
        primaryAction={{
          labelKey: "toHome",
          href: "/",
        }}
        secondaryAction={{
          labelKey: "browseAll",
          href: "/shop",
        }}
      />
    );
  }

  return (
    <div className="relative">
      <div className="layout-spacing space-y-20">
        <CategoryHero locale={locale} category={category} />

        <div>
          <div className="grid grid-cols-2 items-center gap-10 px-4 py-8 md:grid-cols-3 md:gap-16 lg:grid-cols-4 lg:gap-20">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>

          <div className="mt-8">
            <ServerPagination
              currentPage={page}
              totalPages={totalPages}
              baseUrl={`/category/${slug}`}
              locale={locale}
            />
          </div>
        </div>
      </div>

      <Image
        src={CategoryLeft1}
        alt="Shape"
        loading="lazy"
        className="absolute top-1/3 left-0 -z-50 max-w-40 md:top-1/6 lg:max-w-52"
      />
      <Image
        src={CategoryRight}
        alt="Shape"
        loading="lazy"
        className="absolute right-0 bottom-1/4 -z-50 max-w-40 lg:max-w-52"
      />
      <Image
        src={CategoryLeft2}
        alt="Shape"
        loading="lazy"
        className="absolute bottom-0 left-0 -z-50 max-w-40 lg:max-w-52"
      />
    </div>
  );
};

export default CategoryPage;
