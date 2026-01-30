import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import "server-only";

export const getUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
};
