import { getSessionCookie } from "better-auth/cookies";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);
  const segments = pathname.split("/");
  const locale = routing.locales.includes(segments[1]) ? segments[1] : null;
  const isAuthPage = locale
    ? pathname === `/${locale}/auth`
    : pathname === "/auth";

  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  if (isAuthPage && sessionCookie) {
    return NextResponse.redirect(
      new URL(locale ? `/${locale}` : "/", request.url),
    );
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*|_vercel).*)"],
};
