import { NextResponse, type NextRequest } from "next/server";
import { resolveLocale } from "@/lib/i18n";

export function proxy(request: NextRequest): NextResponse {
  const locale = resolveLocale(request.headers.get("accept-language"));
  const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  matcher: "/",
};
