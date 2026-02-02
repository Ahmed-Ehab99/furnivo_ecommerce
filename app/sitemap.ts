import { env } from "@/lib/env";
import type { MetadataRoute } from "next";
import { getAllCategorySlugs } from "./data/get-category-by-slug";
import { getAllProductSlugs } from "./data/get-product-by-slug";

const baseUrl = env.BETTER_AUTH_URL;
const staticRoutes = [
  "",
  "auth",
  "shop",
  "search",
  "cart",
  "checkout",
  "payment/success",
  "payment/cancel",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlugs, categorySlugs] = await Promise.all([
    getAllProductSlugs(),
    getAllCategorySlugs(),
  ]);

  const sitemap: MetadataRoute.Sitemap = [];

  // Static pages
  for (const route of staticRoutes) {
    sitemap.push({
      url: `${baseUrl}/${route}`,
      alternates: {
        languages: {
          en: `${baseUrl}/en/${route}`,
          ar: `${baseUrl}/ar/${route}`,
        },
      },
    });
  }

  // Category pages
  for (const slug of categorySlugs) {
    sitemap.push({
      url: `${baseUrl}/category/${slug}`,
      alternates: {
        languages: {
          en: `${baseUrl}/en/category/${slug}`,
          ar: `${baseUrl}/ar/category/${slug}`,
        },
      },
    });
  }

  // Product pages
  for (const slug of productSlugs) {
    sitemap.push({
      url: `${baseUrl}/product/${slug}`,
      alternates: {
        languages: {
          en: `${baseUrl}/en/product/${slug}`,
          ar: `${baseUrl}/ar/product/${slug}`,
        },
      },
    });
  }

  return sitemap;
}
