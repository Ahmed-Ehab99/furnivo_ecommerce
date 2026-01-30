import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function getProductBySlug(slug: string, locale: string = "en") {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      translations: {
        where: { locale },
      },
      images: {
        orderBy: { order: "asc" },
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

  if (!product) {
    return notFound();
  }

  return {
    id: product.id,
    category: product.category.translations[0].title,
    slug: product.slug,
    images: product.images,
    title: product.translations[0]?.title,
    description: product.translations[0]?.description,
    price: Number(product.price),
    discount: product.discount ? Number(product.discount) : null,
    quantity: product.quantity,
    categorySlug: product.category.slug,
  };
}

export type GetProductBySlugType = Awaited<ReturnType<typeof getProductBySlug>>;

export async function getAllProductSlugs(): Promise<string[]> {
  const products = await prisma.product.findMany({
    select: {
      slug: true,
    },
  });

  return products.map((p) => p.slug);
}
