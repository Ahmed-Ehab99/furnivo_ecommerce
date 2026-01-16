import { getProducts } from "@/app/data/get-products";
import { ServerPagination } from "@/components/global/ServerPagination";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Search } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import ProductCard from "../../shop/_components/ProductCard";
import { getCategoryBySlug } from "@/app/data/get-category-by-slug";

type Params = Promise<{ locale: string; slug: string }>;
type SearchParams = Promise<{
  page?: string;
  sort?: string;
}>;

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const { locale, slug } = await params;
  const { page: pageParam, sort } = await searchParams;
  const t = await getTranslations("shop");

  // Parse page number (default to 1)
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const page = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;
  const limit = 12; // Items per page

  // Fetch category first to get its ID
  const category = await getCategoryBySlug(slug, locale);

  // If category doesn't exist, return 404
  if (!category) {
    notFound();
  }

  // Fetch products for this category
  const productsData = await getProducts({
    locale,
    categoryId: category.id,
    priceSort: sort === "asc" || sort === "desc" ? sort : undefined,
    page,
    limit,
  });

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
          </Empty>
        </div>
      ) : (
        <div className="py-30">
          <div className="grid grid-cols-1 items-center gap-10 px-4 py-8 md:grid-cols-3 md:gap-16 lg:grid-cols-4 lg:gap-20">
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
              searchParams={{
                sort: sort || undefined,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
