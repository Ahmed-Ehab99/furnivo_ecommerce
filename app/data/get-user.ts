import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { cache } from "react";
import "server-only";

export const getUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
});
