import { NextResponse } from "next/server";

export function middleware(request) {
  const adminToken = request.cookies.get("adminToken");

  if (!adminToken && !request.nextUrl.pathname.includes("/login")) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard"],
};
