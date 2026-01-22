import { StaticImageData } from "next/image";
import { authClient } from "./auth-client";

export type ApiResponse = {
  status: "success" | "error";
  message: string;
};

export type Session = typeof authClient.$Infer.Session;
export type MainRoutesParams = Promise<{ locale: string }>;
export type DynamicRoutesParams = Promise<{ locale: string; slug: string }>;
export type SearchParams = Promise<{
  search?: string;
  category?: string;
  sort?: string;
  discount?: string;
  page?: string;
}>;

export type GetProductsParams = {
  locale?: string;
  searchQuery?: string;
  categoryId?: string;
  priceSort?: "asc" | "desc";
  onlyDiscounted?: boolean;
  page?: number;
  limit?: number;
};

export type ProductT = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  discount: number | null;
  quantity: number;
  image: string;
  imageAlt: string;
};

export type ProductWithCategoryT = ProductT & {
  type: string;
  category: {
    id: string;
    slug: string;
    title: string;
  };
};

export type GetProductsResult = {
  products: ProductWithCategoryT[];
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

type ImagesT = {
  id: string;
  order: number;
  url: string;
  alt: string;
};

export type ProductResult = {
  id: string;
  category: string;
  slug: string;
  images: ImagesT[];
  title: string;
  description: string;
  price: number;
  discount: number | null;
  quantity: number;
  categorySlug: string;
};

export type CartItem = ProductT & {
  productId: string;
  maxQuantity: number;
};

export type CartState = {
  items: CartItem[];
  total: number;
  totalItems: number;
  loading: boolean;
};

export type Cart =
  | {
      id: string;
      items: {
        id: string;
        productId: string;
        slug: string;
        title: string;
        description: string;
        type: string;
        price: number;
        discount: number | null;
        quantity: number;
        maxQuantity: number;
        image: string;
        imageAlt: string;
      }[];
      total: number;
    }
  | null
  | undefined;
