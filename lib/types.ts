import { AbstractIntlMessages } from "next-intl";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { StaticImageData } from "next/image";
import { authClient } from "./auth-client";

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

export type AuthContextType = {
  isAuthenticated: boolean;
  user: Session["user"] | null;
  setAuth: (auth: {
    isAuthenticated: boolean;
    user: Session["user"] | null;
  }) => void;
};

export type ProvidersProps = React.ComponentProps<typeof NextThemesProvider> & {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
};

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

export type CartItem = ProductT & {
  productId: string;
  maxQuantity: number;
};

export type FeatureItem = {
  id: number;
  image: StaticImageData;
  title: string;
  desc: string;
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

export type DeliveryAddress = {
  city: string;
  streetName: string;
  buildingName: string;
};

export type PaymentMethod = "CARD" | "AMAZON_PAY";

export type CheckoutState = {
  currentStep: number;
  completedSteps: number[];
  deliveryAddress: DeliveryAddress | null;
  paymentMethod: PaymentMethod | null;
};

export type CheckoutItem = {
  productId: string;
  quantity: number;
  price: number;
  title: string;
  description: string;
  image: string;
  slug: string;
};

export type CheckoutSessionInput = {
  locale: string;
  deliveryAddress: {
    city: string;
    streetName: string;
    buildingName: string;
  };
  paymentMethod: "CARD" | "AMAZON_PAY";
  items: CheckoutItem[];
};

export type CreateCheckoutInput = {
  locale: string;
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
  items: CheckoutItem[];
};

export type ServerActionError = {
  success: false;
  error: string;
};

export type ServerActionSuccess<T> = { success: true } & T;
