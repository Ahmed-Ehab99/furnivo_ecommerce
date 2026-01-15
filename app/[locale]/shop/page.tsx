import { getCategories } from "@/app/data/get-categories";
import { getProducts } from "@/app/data/get-products";
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
import { ShopFilters } from "./_components/ShopFilters";
import ProductCard from "./_components/ProductCard";

type Params = Promise<{ locale: string }>;
type SearchParams = Promise<{
  search?: string;
  category?: string;
  sort?: string;
  discount?: string;
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
  } = await searchParams;
  const t = await getTranslations("shop");
  const onlyDiscounted =
    typeof discount === "string" ? discount === "true" : false;

  // Fetch categories and products in parallel
  const [categories, products] = await Promise.all([
    getCategories(locale),
    getProducts({
      locale,
      searchQuery,
      categoryId: category,
      priceSort: sort === "asc" || sort === "desc" ? sort : undefined,
      onlyDiscounted,
    }),
  ]);

  return (
    <div className="container mx-auto px-4">
      {products.length === 0 ? (
        <div className="flex h-screen items-center justify-center">
          <Empty className="max-w-xl">
            <EmptyHeader className="flex flex-col items-center gap-4">
              {/* Icon */}
              <EmptyMedia
                variant="icon"
                className="bg-secondary/60 flex size-20 items-center justify-center rounded-full"
              >
                <Search className="text-muted-foreground size-10" />
              </EmptyMedia>

              {/* Title */}
              <EmptyTitle className="text-center text-2xl font-bold">
                {t("noProducts")}
              </EmptyTitle>

              {/* Description */}
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
        </div>
      )}
    </div>
  );
};

export default ShopPage;
