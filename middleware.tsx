import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest){
    const { pathname, origin } = req.nextUrl;
    // Check if user is already logged in
    const isLoggedIn = (await cookies()).has("auth_token")
    if(pathname === "/" && isLoggedIn){
        return NextResponse.redirect("/dashboard");
    }
    return NextResponse.next();
}

export const config = {
  matcher: [
    // run middleware on all paths except static files, api routes, favicon
    "/((?!_next/static|_next/image|favicon.ico|api/auth/callback).*)",
  ],
};