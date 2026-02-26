import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const locales = routing.locales;
const defaultLocale = routing.defaultLocale;

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

function isValidLocale(locale: string): locale is (typeof locales)[number] {
  return locales.includes(locale as any);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.includes('/error') || pathname.includes('/not-found')) {
    return NextResponse.next();
  }

  const hasLocale = locales.some((loc) => pathname.startsWith(`/${loc}`));
  if (!hasLocale) {
    const preferredLocale = req.cookies.get("preferredLocale")?.value;

    if (preferredLocale && isValidLocale(preferredLocale)) {
      const cleanedPath = pathname.replace(/^\/(en|es|fr|de|jp)(?=\/|$)/, "");
      const url = req.nextUrl.clone();
      url.pathname = `/${preferredLocale}${
        cleanedPath.startsWith("/") ? cleanedPath : `/${cleanedPath}`
      }`;
      return NextResponse.redirect(url);
    }
  }

  const pathParts = pathname.split("/");
  const localePart = pathParts[1];

  if (locales.includes(localePart as any)) {
    const rest = pathParts.slice(2).join("/");
    const secondPart = rest.split("/")[0];

    if (locales.includes(secondPart as any)) {
      const url = req.nextUrl.clone();
      url.pathname = `/${secondPart}/${rest.split("/").slice(1).join("/")}`;
      return NextResponse.redirect(url);
    }
  }

  const res = intlMiddleware(req);

  // Authentication has been removed; simply continue to the next response.
  return res;
}
export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
