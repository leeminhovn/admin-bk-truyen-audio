import { NextResponse } from "next/server";

export function middleware(request) {
  const adminToken = request.cookies.get("adminToken");
  const shouldHandleRedirect =
    !request.nextUrl.pathname.includes("/login") &&
    !request.nextUrl.pathname.startsWith("/_next");

  if (!adminToken && shouldHandleRedirect) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
