"use client";

import { authClient } from "@/lib/auth-client";
import { useGetCartQuery } from "./cartApi";

export default function CartInitializer({
  locale = "en",
}: {
  locale?: string;
}) {
  const { data: session } = authClient.useSession();
  useGetCartQuery(locale, {
    skip: !session?.user, // Don't fetch if not authenticated
  });

  return null;
}
