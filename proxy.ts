import { isAdmin } from "@/lib/auth";
import { stackServerApp } from "@stack/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const user = await stackServerApp.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/api/admin")) {
    const isAdminUser = await isAdmin(user.id);
    if (!isAdminUser) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/learn/:path*", "/dashboard/:path*", "/api/admin/:path*"],
};
