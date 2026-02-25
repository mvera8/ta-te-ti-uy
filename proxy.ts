// proxy.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
    const { nextUrl } = req;

    const isLoggedIn = !!req.auth;
    const { pathname } = req.nextUrl;
    const isProtectedRoute =
        nextUrl.pathname.startsWith("/playroom") ||
        nextUrl.pathname.startsWith("/game") ||
        nextUrl.pathname.startsWith("/ranking") ||
        nextUrl.pathname.startsWith("/profile");

    if (isProtectedRoute && !isLoggedIn) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", nextUrl.href);

        return NextResponse.redirect(loginUrl);
    }

    if (isLoggedIn) {
        // Si está logueado e intenta ir a login o a la home, redirigir a playroom
        if (pathname === "/" || pathname === "/login") {
            return NextResponse.redirect(new URL("/playroom", req.nextUrl))
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/playroom/:path*",
        "/game/:path*",
        "/ranking",
        "/profile",
        "/login",
        "/",
    ],
};
