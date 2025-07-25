import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const publicPaths = ["/", "/echoes"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/static/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const res = NextResponse.next();

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isPublicPath = publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: res.headers });
  }
  return res;
}

export const config = {
  matcher: ["/((?!api/|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
