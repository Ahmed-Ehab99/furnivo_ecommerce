import NotFound from "@/components/global/NotFound";
import { MainRoutesParams } from "@/lib/types";
import { gilroy } from "@/public/fonts";
import "./globals.css";

const GlobalNotFound = async ({ params }: { params: MainRoutesParams }) => {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={`${gilroy.variable} h-screen antialiased`}>
        <NotFound tKey="notFound.global" />
      </body>
    </html>
  );
};

export default GlobalNotFound;
