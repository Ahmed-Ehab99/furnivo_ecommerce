import { StaticImageData } from "next/image";
import { authClient } from "./auth-client";

export type ApiResponse = {
  status: "success" | "error";
  message: string;
};

export type Session = typeof authClient.$Infer.Session;
export type HomeParams = Promise<{ locale: string }>;

export type GetProductsParams = {
  locale?: string;
  searchQuery?: string;
  categoryId?: string;
  priceSort?: "asc" | "desc";
  onlyDiscounted?: boolean;
  page?: number;
  limit?: number;
};

export type GetProductsResult = {
  products: Array<{
    id: string;
    slug: string;
    price: number;
    discount: number | null;
    quantity: number;
    image: string;
    imageAlt: string;
    type: string;
    title: string;
    description: string;
    category: {
      id: string;
      slug: string;
      title: string;
    };
  }>;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type CategoryResult = {
  id: string;
  slug: string;
  thumbnail: string;
  imageAlt: string;
  title: string;
  description: string;
};

export type FeatureItem = {
  id: number;
  image: StaticImageData;
  title: string;
  desc: string;
};
