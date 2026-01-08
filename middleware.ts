import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // protege tudo dentro de /admin, exceto /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const cookieToken = req.cookies.get("admin_token")?.value || "";
    const adminToken = process.env.ADMIN_TOKEN || "";

    if (!adminToken || cookieToken !== adminToken) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
