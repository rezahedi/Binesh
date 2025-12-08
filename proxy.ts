import { stackServerApp } from "@stack/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const user = await stackServerApp.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/learn/:path*"],
};
