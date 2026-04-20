import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = req.headers.get("host") || "";

  const isLocalhost =
    host.startsWith("localhost:") || host.startsWith("127.0.0.1:");

  const isAppSubdomain =
    !isLocalhost &&
    (host === "app.reciclativa.com" || host.startsWith("app.reciclativa.com:"));

  // app.reciclativa.com -> mostra página própria na raiz
  if (isAppSubdomain && pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/app-home";
    return NextResponse.rewrite(url);
  }

  // Rotas livres do admin
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protege /admin/*
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin-token")?.value;

    if (!token) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*"],
};
