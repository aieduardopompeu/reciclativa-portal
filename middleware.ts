import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_MASTER_SESSION_COOKIE = "admin-master-session";

function isLocalHost(host: string) {
  return (
    host.startsWith("localhost:") ||
    host.startsWith("127.0.0.1:") ||
    host === "localhost" ||
    host === "127.0.0.1"
  );
}

function isAdminAuthPublicPath(pathname: string) {
  return (
    pathname === "/admin/login" ||
    pathname === "/admin-login" ||
    pathname === "/admin/mfa" ||
    pathname === "/admin/mfa/setup"
  );
}

function redirectPreservingHost(req: NextRequest, pathname: string) {
  const url = req.nextUrl.clone();
  url.pathname = pathname;
  return url;
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const host = req.headers.get("host") || "";

  const isAppSubdomain =
    !isLocalHost(host) &&
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
    isAdminAuthPublicPath(pathname) ||
    pathname.startsWith("/api/admin/auth/login")
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(ADMIN_MASTER_SESSION_COOKIE)?.value;

    if (!token) {
      const loginUrl = redirectPreservingHost(req, "/admin/login");
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/admin-login", "/api/admin/auth/login"],
};
