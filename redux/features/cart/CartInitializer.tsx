"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useGetCartQuery } from "./cartApi";

export default function CartInitializer({
  locale = "en",
}: {
  locale?: string;
}) {
  const { data: session } = authClient.useSession();
  const { data: cart } = useGetCartQuery(locale, {
    skip: !session?.user, // Don't fetch if not authenticated
  });

  useEffect(() => {
    // Cart data is now in Redux store via RTK Query
    // The hook automatically handles caching and updates
    if (cart) {
      console.log("Cart initialized:", cart);
    }
  }, [cart]);

  return null;
}
