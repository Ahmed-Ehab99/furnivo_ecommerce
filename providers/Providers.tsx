"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import AuthInitializer from "@/contexts/AuthInitializer";
import { ProvidersProps } from "@/lib/types";
import CartInitializer from "@/redux/features/cart/CartInitializer";
import { AppStore, makeStore } from "@/redux/store";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useState } from "react";
import { Provider } from "react-redux";

const Providers = ({
  children,
  locale,
  messages,
  ...props
}: ProvidersProps) => {
  const [store] = useState<AppStore>(() => makeStore());

  return (
    <AuthProvider initialValue={{ isAuthenticated: false, user: null }}>
      <Provider store={store}>
        <NextThemesProvider {...props}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AuthInitializer />
            <CartInitializer locale={locale} />
            {children}
          </NextIntlClientProvider>
        </NextThemesProvider>
      </Provider>
    </AuthProvider>
  );
};

export default Providers;
