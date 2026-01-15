import { prisma } from "@/lib/db";
import { Prisma } from "@/prisma/generated/prisma/client";
import "server-only";

type GetProductsParams = {
  locale?: string;
  searchQuery?: string;
  categoryId?: string;
  priceSort?: "asc" | "desc";
  onlyDiscounted?: boolean;
};

export const getProducts = async ({
  locale = "en",
  searchQuery,
  categoryId,
  priceSort,
  onlyDiscounted = false,
}: GetProductsParams = {}) => {
  const where: Prisma.ProductWhereInput = {};

  // Filter by category if provided
  if (categoryId) {
    where.categoryId = categoryId;
  }

  // Filter by search query if provided
  if (searchQuery) {
    where.translations = {
      some: {
        locale,
        OR: [
          {
            title: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        ],
      },
    };
  }

  if (onlyDiscounted) {
    where.discount = {
      gt: 0,
      not: null,
    };
  }

  const orderBy: Array<
    { price?: "asc" | "desc" } | { createdAt?: "asc" | "desc" }
  > = [];

  // Sort by price if provided
  if (priceSort) {
    orderBy.push({ price: priceSort });
  } else {
    // Default sort by creation date
    orderBy.push({ createdAt: "desc" });
  }

  const products = await prisma.product.findMany({
    where,
    orderBy,
    include: {
      translations: {
        where: { locale },
      },
      images: {
        orderBy: {
          order: "asc",
        },
        take: 1, // Get only the first image for the grid
      },
      category: {
        include: {
          translations: {
            where: { locale },
          },
        },
      },
    },
  });

  return products.map((product) => ({
    id: product.id,
    slug: product.slug,
    price: product.price,
    discount: product.discount,
    quantity: product.quantity,
    image: product.images[0]?.url,
    imageAlt: product.images[0]?.alt,
    type: product.translations[0]?.type,
    title: product.translations[0]?.title,
    description: product.translations[0]?.description,
    category: {
      id: product.category.id,
      slug: product.category.slug,
      title: product.category.translations[0]?.title,
    },
  }));
};

export type GetProductsType = Awaited<ReturnType<typeof getProducts>>[0];
