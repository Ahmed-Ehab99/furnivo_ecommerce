import { getCategories } from "@/app/data/get-categories";
import { getProducts } from "@/app/data/get-products";
import EmptyState from "@/components/global/EmptyState";
import ProductCard from "@/components/global/ProductCard";
import { ServerPagination } from "@/components/global/ServerPagination";
import { SearchParams } from "@/lib/types";
import { Search } from "lucide-react";
import { Suspense } from "react";
import { ShopFilters, ShopFiltersSkeleton } from "./ShopFilters";

const ShopContent = async ({
  locale,
  searchParams,
}: {
  locale: string;
  searchParams: SearchParams;
}) => {
  const {
    search: searchQuery,
    category,
    sort,
    discount,
    page: pageParam,
  } = await searchParams;

  const onlyDiscounted =
    typeof discount === "string" ? discount === "true" : false;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const page = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

  const productsData = await getProducts({
    locale,
    searchQuery,
    categoryId: category,
    priceSort: sort === "asc" || sort === "desc" ? sort : undefined,
    onlyDiscounted,
    page,
  });

  const { products, totalPages } = productsData;

  if (products.length === 0) {
    return (
      <EmptyState
        namespace="shop"
        icon={Search}
        titleKey="noProducts"
        descriptionKey="noProductsDesc"
        primaryAction={{
          labelKey: "browseAll",
          href: "/shop",
        }}
        secondaryAction={{
          labelKey: "search",
          href: "/search",
        }}
      />
    );
  }

  return (
    <>
      <Suspense fallback={<ShopFiltersSkeleton />}>
        <RenderShopFilters locale={locale} category={category} sort={sort} />
      </Suspense>

      <div className="grid grid-cols-2 items-center gap-10 px-4 py-8 md:grid-cols-3 md:gap-16 lg:grid-cols-4 lg:gap-20">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>

      <div className="mt-8">
        <ServerPagination
          currentPage={page}
          totalPages={totalPages}
          baseUrl="/shop"
          locale={locale}
          searchParams={{
            search: searchQuery || undefined,
            category: category || undefined,
            sort: sort || undefined,
            discount: discount || undefined,
          }}
        />
      </div>
    </>
  );
};

export default ShopContent;

interface RenderShopFiltersProps {
  locale: string;
  category: string | undefined;
  sort: string | undefined;
}

const RenderShopFilters = async ({
  locale,
  category,
  sort,
}: RenderShopFiltersProps) => {
  const categories = await getCategories(locale);

  return (
    <ShopFilters
      locale={locale}
      categories={categories}
      currentCategory={category}
      currentPriceSort={sort}
    />
  );
};
