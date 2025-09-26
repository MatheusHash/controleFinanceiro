import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const protectedPaths = ["/home", "/dashboard"];

  const isProtectedPath = protectedPaths.includes(pathname);
  const token = req.cookies.get("token")?.value;

  if (isProtectedPath && !token) {
    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}
