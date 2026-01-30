"use client";

import { AuthContextType } from "@/lib/types";
import { createContext, useState } from "react";

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  setAuth: () => {},
});

export const AuthProvider = ({
  children,
  initialValue = { isAuthenticated: false, user: null },
}: {
  children: React.ReactNode;
  initialValue?: Omit<AuthContextType, "setAuth">;
}) => {
  const [auth, setAuth] = useState(initialValue);

  const value: AuthContextType = {
    ...auth,
    setAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
