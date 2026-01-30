import { prisma } from "@/lib/db";
import "server-only";

export const getCategories = async (locale: string = "en") => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "asc",
    },
    include: {
      translations: {
        where: { locale },
      },
    },
  });

  return categories.map((category) => ({
    id: category.id,
    slug: category.slug,
    thumbnail: category.thumbnail,
    imageAlt: category.imageAlt,
    title: category.translations[0]?.title,
    description: category.translations[0]?.description,
  }));
};

export type GetCategoriesType = Awaited<ReturnType<typeof getCategories>>;
