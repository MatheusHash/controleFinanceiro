import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/session";

export async function middleware(req: NextRequest) {
  await updateSession(req);
  const protectedPaths = ["/home", "/dashboard"];
  const { pathname } = req.nextUrl;
  if (!req.cookies.get("token")) {
    if (protectedPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
