import { getSessionCookie } from "better-auth/cookies";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = ["/checkout", "/payment/success", "/payment/cancel"];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/webhook/stripe")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);
  const segments = pathname.split("/");
  const locale = routing.locales.includes(segments[1]) ? segments[1] : null;
  const normalizedPath = locale ? `/${segments.slice(2).join("/")}` : pathname;
  const isAuthPage = locale
    ? pathname === `/${locale}/auth`
    : pathname === "/auth";
  const isProtectedRoute = protectedRoutes.some((route) =>
    normalizedPath.startsWith(route),
  );

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(
      new URL(locale ? `/${locale}/auth` : "/auth", request.url),
    );
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
