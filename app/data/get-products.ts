import { LOCALES } from "@/i18n/routing";
import { prisma } from "@/lib/db";
import { GetProductsParams, GetProductsResult } from "@/lib/types";
import { Prisma } from "@/prisma/generated/prisma/client";
import "server-only";

export const getProducts = async ({
  locale = "en",
  searchQuery,
  categoryId,
  priceSort,
  onlyDiscounted = false,
  page = 1,
  limit = 12,
}: GetProductsParams = {}): Promise<GetProductsResult> => {
  const where: Prisma.ProductWhereInput = {};

  // Filter by category if provided
  if (categoryId) {
    where.categoryId = categoryId;
  }

  // Filter by search query if provided
  if (searchQuery) {
    where.translations = {
      some: {
        OR: LOCALES.flatMap((l) => [
          {
            locale: l,
            title: { contains: searchQuery, mode: "insensitive" },
          },
          {
            locale: l,
            description: { contains: searchQuery, mode: "insensitive" },
          },
        ]),
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

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Get total count for pagination
  const total = await prisma.product.count({ where });

  // Fetch products with pagination
  const products = await prisma.product.findMany({
    where,
    orderBy,
    skip,
    take: limit,
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

  const formattedProducts = products.map((product) => ({
    id: product.id,
    slug: product.slug,
    price: Number(product.price),
    discount: product.discount ? Number(product.discount) : null,
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

  const totalPages = Math.ceil(total / limit);

  return {
    products: formattedProducts,
    total,
    page,
    limit,
    totalPages,
  };
};

export type GetProductsType = Awaited<
  ReturnType<typeof getProducts>
>["products"][0];
