"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { ProvidersProps } from "@/lib/types";
import { AppStore, makeStore } from "@/redux/store";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useState } from "react";
import { Provider } from "react-redux";

const Providers = ({
  children,
  isAuthenticated,
  user,
  locale,
  messages,
  ...props
}: ProvidersProps) => {
  const [store] = useState<AppStore>(() => makeStore());

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      <Provider store={store}>
        <NextThemesProvider {...props}>
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
          >
            {children}
          </NextIntlClientProvider>
        </NextThemesProvider>
      </Provider>
    </AuthContext.Provider>
  );
};

export default Providers;
