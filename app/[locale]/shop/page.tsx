import { getCategories } from "@/app/data/get-categories";
import { getProducts } from "@/app/data/get-products";
import { ServerPagination } from "@/components/global/ServerPagination";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Search } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import ProductCard from "./_components/ProductCard";
import { ShopFilters } from "./_components/ShopFilters";

type Params = Promise<{ locale: string }>;
type SearchParams = Promise<{
  search?: string;
  category?: string;
  sort?: string;
  discount?: string;
  page?: string;
}>;

const ShopPage = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const { locale } = await params;
  const {
    search: searchQuery,
    category,
    sort,
    discount,
    page: pageParam,
  } = await searchParams;
  const t = await getTranslations("shop");
  const onlyDiscounted =
    typeof discount === "string" ? discount === "true" : false;

  // Parse page number (default to 1)
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const page = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;
  const limit = 8; // Items per page

  // Fetch categories and products in parallel
  const [categories, productsData] = await Promise.all([
    getCategories(locale),
    getProducts({
      locale,
      searchQuery,
      categoryId: category,
      priceSort: sort === "asc" || sort === "desc" ? sort : undefined,
      onlyDiscounted,
      page,
      limit,
    }),
  ]);

  const { products, totalPages } = productsData;

  return (
    <div className="container mx-auto px-4">
      {products.length === 0 ? (
        <div className="flex h-screen items-center justify-center">
          <Empty className="max-w-xl">
            <EmptyHeader className="flex flex-col items-center gap-4">
              <EmptyMedia
                variant="icon"
                className="bg-secondary/60 flex size-20 items-center justify-center rounded-full"
              >
                <Search className="text-muted-foreground size-10" />
              </EmptyMedia>

              <EmptyTitle className="text-center text-2xl font-bold">
                {t("noProducts")}
              </EmptyTitle>

              <EmptyDescription className="max-w-sm text-center">
                {t("noProductsDesc")}
              </EmptyDescription>
            </EmptyHeader>

            {/* Actions */}
            <EmptyContent className="mt-6 flex justify-center gap-3">
              <Button asChild>
                <Link href="/shop">{t("browseAll")}</Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/search">{t("search")}</Link>
              </Button>
            </EmptyContent>
          </Empty>
        </div>
      ) : (
        <div className="py-30">
          <ShopFilters
            locale={locale}
            categories={categories}
            currentCategory={category}
            currentPriceSort={sort}
          />
          <div className="grid grid-cols-1 items-center gap-10 px-4 py-8 md:grid-cols-3 md:gap-16 lg:grid-cols-4 lg:gap-20">
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
        </div>
      )}
    </div>
  );
};

export default ShopPage;
