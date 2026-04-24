import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_MASTER_SESSION_COOKIE = "admin-master-session";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const host = req.headers.get("host") || "";

  const isLocalhost =
    host.startsWith("localhost:") || host.startsWith("127.0.0.1:");

  const isAppSubdomain =
    !isLocalhost &&
    (host === "app.reciclativa.com" || host.startsWith("app.reciclativa.com:"));

  if (isAppSubdomain && pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/app-home";
    return NextResponse.rewrite(url);
  }

  if (pathname === "/admin/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/admin-login";
    url.search = search;
    return NextResponse.rewrite(url);
  }

  if (
    pathname === "/admin-login" ||
    pathname.startsWith("/api/admin/auth/login")
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(ADMIN_MASTER_SESSION_COOKIE)?.value;

    if (!token) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/admin-login", "/api/admin/auth/login"],
};
