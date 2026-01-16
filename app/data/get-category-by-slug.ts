import { prisma } from "@/lib/db";
import { CategoryResult } from "@/lib/types";
import "server-only";

export const getCategoryBySlug = async (
  slug: string = "",
  locale: string = "en",
): Promise<CategoryResult | null> => {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      translations: {
        where: { locale },
      },
    },
  });

  if (!category) {
    return null;
  }

  return {
    id: category.id,
    slug: category.slug,
    thumbnail: category.thumbnail,
    imageAlt: category.imageAlt,
    title: category.translations[0]?.title,
    description: category.translations[0]?.description,
  };
};

export type GetCategoryBySlugType = Awaited<
  ReturnType<typeof getCategoryBySlug>
>;
