import { NextRequest, NextResponse } from "next/server";

const authorizedRoutes = ["/"];
const loggedOutRoutes = ["/login"];

export const middleware = (req: NextRequest) => {
  const isLoggedIn = !!req.cookies.get("token");
  const requestUrl = req.nextUrl.pathname;

  if (authorizedRoutes.includes(requestUrl) && !isLoggedIn) {
    req.cookies.delete("token");
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("token");

    return res;
  }

  if (req.nextUrl.pathname === "/" && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (loggedOutRoutes.includes(requestUrl) && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)", "/((?!ws$).*)"],
};
