"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { authClient } from "@/lib/auth-client";
import { useContext, useEffect } from "react";

export default function AuthInitializer() {
  const { data: session, isPending } = authClient.useSession();
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!isPending && session?.user) {
      setAuth({
        isAuthenticated: true,
        user: session.user,
      });
    }
  }, [session, isPending, setAuth]);

  return null;
}
