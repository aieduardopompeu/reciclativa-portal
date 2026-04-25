import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_MASTER_SESSION_COOKIE = "admin-master-session";
const SAAS_SESSION_COOKIE = "saas-session";

function redirectToLogin(req: NextRequest, nextPath: string) {
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("next", nextPath);
  return NextResponse.redirect(loginUrl);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
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

  if (pathname === "/admin/login" || pathname === "/admin-login") {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", req.nextUrl.searchParams.get("next") || "/admin");
    const error = req.nextUrl.searchParams.get("error");
    const email = req.nextUrl.searchParams.get("email");
    if (error) url.searchParams.set("error", error);
    if (email) url.searchParams.set("email", email);
    return NextResponse.redirect(url);
  }

  if (pathname === "/app/login") {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", "/app/dashboard");
    const error = req.nextUrl.searchParams.get("error");
    const email = req.nextUrl.searchParams.get("email");
    if (error) url.searchParams.set("error", error);
    if (email) url.searchParams.set("email", email);
    return NextResponse.redirect(url);
  }

  const publicAuthRoutes =
    pathname === "/login" ||
    pathname.startsWith("/api/auth/login") ||
    pathname.startsWith("/api/admin/auth") ||
    pathname.startsWith("/api/app/auth") ||
    pathname.startsWith("/admin/mfa") ||
    pathname.startsWith("/app/mfa") ||
    pathname.startsWith("/app/primeiro-acesso");

  if (publicAuthRoutes) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(ADMIN_MASTER_SESSION_COOKIE)?.value;
    if (!token) return redirectToLogin(req, pathname);
  }

  if (pathname.startsWith("/app")) {
    const token = req.cookies.get(SAAS_SESSION_COOKIE)?.value;
    if (!token) return redirectToLogin(req, pathname);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/admin/:path*",
    "/admin-login",
    "/app/:path*",
    "/api/auth/login",
    "/api/admin/auth/:path*",
    "/api/app/auth/:path*",
  ],
};
